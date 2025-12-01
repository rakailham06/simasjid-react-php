<?php
// backend/login.php
require 'config.php';

$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $stmt = $pdo->prepare("SELECT u.id, u.password, p.nama_lengkap, p.jabatan FROM users u JOIN pengurus p ON u.id = p.user_id WHERE u.email = ?");
  $stmt->execute([$email]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($user && password_verify($password, $user['password'])) {
    $token = bin2hex(random_bytes(16));

    echo json_encode([
      "success" => true,
      "message" => "Login berhasil",
      "token" => $token,
      "user" => [
        "nama" => $user['nama_lengkap'],
        "jabatan" => $user['jabatan']
      ]
    ]);
  } else {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Email atau password salah"]);
  }
}
?>