<?php
// fb_conversion.php - Envia eventos Purchase para a API de Conversões do Facebook
header('Content-Type: application/json');

// Recebe os dados do POST
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit;
}

// Usa os dados recebidos ou valores padrão
$access_token = isset($data['access_token']) ? $data['access_token'] : 'SEU_TOKEN_PADRAO_AQUI';
$pixel_id = isset($data['pixel_id']) ? $data['pixel_id'] : 'SEU_PIXEL_ID_PADRAO_AQUI';
$fb_api_url = "https://graph.facebook.com/v18.0/$pixel_id/events?access_token=$access_token";

// Monta o payload do evento
$event = [
    'event_name' => 'Purchase',
    'event_time' => time(),
    'event_id' => isset($data['event_id']) ? $data['event_id'] : uniqid('purchase_', true),
    'action_source' => 'website',
    'event_source_url' => isset($data['source_url']) ? $data['source_url'] : $_SERVER['HTTP_REFERER'],
    'user_data' => [
        // Dados mínimos para melhor correspondência (pode ser expandido)
        'client_ip_address' => $_SERVER['REMOTE_ADDR'],
        'client_user_agent' => $_SERVER['HTTP_USER_AGENT']
    ],
    'custom_data' => [
        'currency' => isset($data['currency']) ? $data['currency'] : 'BRL',
        'value' => isset($data['value']) ? floatval($data['value']) : 0,
        'num_items' => isset($data['num_items']) ? intval($data['num_items']) : 1
    ]
];

$payload = [
    'data' => [$event]
];

// Envia para o Facebook
$ch = curl_init($fb_api_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Retorna resposta
if ($http_code == 200) {
    echo json_encode(['success' => true, 'fb_response' => json_decode($response, true)]);
} else {
    echo json_encode(['success' => false, 'fb_response' => json_decode($response, true), 'http_code' => $http_code]);
} 