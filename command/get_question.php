<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $nextId = $_GET['id'];
        $data = array();
        switch ($nextId) {
            case "q1":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q2',
                    'questions' => array(
                        '早速、診断を始めましょう。',
                        'まず、お客様のご希望についてお伺いします！',
                        'どんなカードローンをご希望ですか？(複数選択可）',
                    ),
                    'options' => array(
                        '最短30分で借りられる',
                        '誰にもバレずに内緒で借りれる',
                        '金利が低い',
                        '審査に通りやすい',
                        '口コミの評価が高い',
                    ),
                    'type' => 'multiselect',
                );
                break;
            case "q2":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q3',
                    'questions' => array(
                        'いくら借りたいですか？（大体で構いません）'
                    ),
                    'options' => [],
                    'type' => 'scrollbar',
                );
                break;
            case "q3":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q4',
                    'questions' => array(
                        'いつまでに借りたいですか？',
                    ),
                    'options' => array(
                        '1時間以内',
                        '今日中',
                        '3日以内',
                        '1週間以内',
                        'その他',
                    ),
                );
                break;
            case "q4":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q6',
                    'questions' => array(
                        'お受け取りはどちらをご希望ですか？',
                    ),
                    'options' => array(
                        'コンビニATM',
                        '口座振込',
                    ),
                );
                break;
            case "q6":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q7',
                    'questions' => array(
                        'ありがとうございます！診断完了までもう少しです。',
                        'お客様についてもいくつか教えてください！',
                        'あなたのご職業はどちらですか？',
                    ),
                    'options' => array(
                        '公務員',
                        '正社員',
                        '契約社員',
                        '派遣社員',
                        'パート/アルバイト',
                        '専業主婦',
                        '学生',
                        '個人事業主/経営者',
                        '無職',
                    ),
                    'type' => 'dropdown',
                );
                break;
            case "q7":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q8',
                    'questions' => array(
                        '年収はどのくらいですか？'
                    ),
                    'options' => [],
                    'type' => 'scrollbar',
                );
                break;
            case "q8":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q9',
                    'questions' => array(
                        '収入証明書は手元にありますか',
                    ),
                    'options' => array(
                        'はい',
                        'いいえ',
                    ),
                );
                break;
            case "q9":
                $data = array(
                    'id' => $nextId,
                    'questions' => array(
                        '過去に借り入れをしたことはありますか？',
                    ),
                    'options' => array(
                        'はい' => 'q10',
                        'いいえ' => 'last',
                    ),
                );
                break;
            case "q10":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'last',
                    'questions' => array(
                        '過去に延滞経験はありますか？',
                    ),
                    'options' => array(
                        'はい',
                        'いいえ',
                    ),
                );
                break;
            case "last":
                $data = array(
                    'questions' => array(
                        'ありがとうございます。診断の結果、あなたは[AMOUNT]万円まで借りられます',
                        'ご回答頂いた情報からあなたにおすすめのカードローンをご紹介いたします！',
                        '今すぐ確認してみる',
                    ),
                    'options1' => array(
                        // 'プロミス',
                        // 'モビット',
                        // 'アコム',
                        // 'アイフル',
                        'promise',
                        'mobit',
                        'acom',
                        'aiful',
                    ),
                    'options2' => array(
                        // 'モビット',
                        // 'プロミス',
                        // 'アコム',
                        // 'アイフル',
                        'mobit',
                        'promise',
                        'acom',
                        'aiful',
                    ),
                    'type' => 'last',
                );
            default:
                break;
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
    header('HTTP/1.1 400 Bad Request');
    echo 'Missing id parameter';
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Invalid request method';
}