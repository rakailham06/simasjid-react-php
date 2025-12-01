<?php
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $search = $_GET['search'] ?? '';
    $sql = "SELECT * FROM inventaris";

    if ($search) {
      $sql .= " WHERE nama_barang LIKE :search";
    }

    $sql .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    if ($search) {
      $stmt->bindValue(':search', "%$search%");
    }

    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
    break;

  case 'POST':
    $input = json_decode(file_get_contents("php://input"), true);
    $sql = "INSERT INTO inventaris (nama_barang, kode_barang, jumlah, kondisi, lokasi_simpan) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      $input['nama_barang'],
      $input['kode_barang'],
      $input['jumlah'],
      $input['kondisi'],
      $input['lokasi_simpan']
    ]);
    echo json_encode(["success" => true, "message" => "Data disimpan"]);
    break;

}
?>