<?php
require 'config.php';

$allowed_tables = [
    'users',
    'pengurus',
    'inventaris',
    'jadwal_imam',
    'keuangan',
    'zakat',
    'kurban'
];

$table = $_GET['table'] ?? '';
$id = $_GET['id'] ?? null;

if (!in_array($table, $allowed_tables)) {
    http_response_code(400);
    echo json_encode(["error" => "Tabel tidak ditemukan atau dilarang"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    // READ (GET)
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM $table WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            if ($table === 'jadwal_imam') {
                $sql = "SELECT 
                            j.*, 
                            p1.nama_lengkap AS nama_imam,
                            p2.nama_lengkap AS nama_muadzin,
                            p3.nama_lengkap AS nama_khatib
                        FROM jadwal_imam j
                        LEFT JOIN pengurus p1 ON j.imam_id = p1.id
                        LEFT JOIN pengurus p2 ON j.muadzin_id = p2.id
                        LEFT JOIN pengurus p3 ON j.khatib_id = p3.id
                        ORDER BY j.tanggal ASC"; // Urutkan dari tanggal terdekat
                $stmt = $pdo->query($sql);
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                exit; // Stop agar tidak lanjut ke query default di bawah
            }

            if ($table === 'inventaris') {
                $sql = "SELECT i.*, p.nama_lengkap AS nama_pj 
                        FROM inventaris i 
                        LEFT JOIN pengurus p ON i.penanggung_jawab_id = p.id 
                        ORDER BY i.id DESC";
                $stmt = $pdo->query($sql);
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                exit;
            }

            if ($table === 'kurban') {
                $sql = "SELECT k.*, p.nama_lengkap AS nama_panitia 
            FROM kurban k 
            LEFT JOIN pengurus p ON k.panitia_id = p.id 
            ORDER BY k.id DESC";
                $stmt = $pdo->query($sql);
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                exit; 
            }

            $stmt = $pdo->query("SELECT * FROM $table ORDER BY id DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

        }
    }

    // CREATE (POST)
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents("php://input"), true);

        $columns = implode(", ", array_keys($input));
        $placeholders = implode(", ", array_fill(0, count($input), "?"));
        $values = array_values($input);

        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        echo json_encode(["success" => true, "message" => "Data berhasil ditambahkan"]);
    }

    // UPDATE (PUT)
    elseif ($method === 'PUT') {
        if (!$id)
            die(json_encode(["error" => "ID diperlukan untuk edit"]));

        $input = json_decode(file_get_contents("php://input"), true);
        $setClause = "";
        $values = [];

        foreach ($input as $key => $value) {
            $setClause .= "$key = ?, ";
            $values[] = $value;
        }
        $setClause = rtrim($setClause, ", ");
        $values[] = $id;

        $sql = "UPDATE $table SET $setClause WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        echo json_encode(["success" => true, "message" => "Data berhasil diupdate"]);
    }

    // DELETE (DELETE)
    elseif ($method === 'DELETE') {
        if (!$id)
            die(json_encode(["error" => "ID diperlukan untuk hapus"]));

        $stmt = $pdo->prepare("DELETE FROM $table WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(["success" => true, "message" => "Data berhasil dihapus"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>