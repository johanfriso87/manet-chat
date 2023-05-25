<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $nextId = $_GET['id'];
        $data = array();
        switch ($nextId) {
            case "q23":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q01',
                    'questions' => array(
                        '早速、診断を始めましょう。',
                        'まず、お客様のご希望についてお伺いします！',
                        'どんなカードローンをご希望ですか？(複数選択可）',
                    ),
                    'options' => array(
                        '最短30分で借りられる' => 'a101',
                        '誰にもバレずに内緒で借りれる' => 'a100',
                        '金利が低い' => '',
                        '審査に通りやすい' => 'a99',
                        '口コミの評価が高い' => '',
                    ),
                    'type' => 'multiselect',
                );
                break;
            case "q01":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q02',
                    'questions' => array(
                        'いくら借りたいですか？（大体で構いません）'
                    ),
                    'options' => [],
                    'type' => 'scrollbar',
                );
                break;
            case "q02":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q24',
                    'questions' => array(
                        'いつまでに借りたいですか？',
                    ),
                    'options' => array(
                        '30分以内' => 'a144',
                        '今日中' => 'a06',
                        '3日以内' => 'a07',
                        '1週間以内' => 'a08',
                        'その他' => 'a09',
                    ),
                );
                break;
            case "q24":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q06',
                    'questions' => array(
                        'お受け取りはどちらをご希望ですか？',
                    ),
                    'options' => array(
                        'コンビニATM' => 'a104',
                        '口座振込' => 'a103',
                    ),
                );
                break;
            case "q06":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q10',
                    'questions' => array(
                        'ありがとうございます！診断完了までもう少しです。',
                        'お客様についてもいくつか教えてください！',
                        'あなたのご職業はどちらですか？',
                    ),
                    'options' => array(
                        '公務員' => 'a25',
                        '正社員' => 'a26',
                        '契約社員' => 'a27',
                        '派遣社員' => 'a28',
                        'パート/アルバイト' => 'a29',
                        '専業主婦' => 'a30',
                        '学生' => 'a31',
                        '個人事業主/経営者' => 'a32',
                        '無職' => 'a33',
                    ),
                    'type' => 'dropdown',
                );
                break;
            case "q10":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q25',
                    'questions' => array(
                        '年収はどのくらいですか？'
                    ),
                    'options' => [],
                    'type' => 'scrollbar',
                );
                break;
            case "q25":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'q21',
                    'questions' => array(
                        '収入証明書は手元にありますか？',
                    ),
                    'options' => array(
                        'はい' => 'a105',
                        'いいえ' => 'a106',
                    ),
                );
                break;
            case "q21":
                $data = array(
                    'id' => $nextId,
                    'questions' => array(
                        '過去に借り入れをしたことはありますか？',
                    ),
                    'options' => array(
                        // 'はい' => 'q10',
                        'はい' => 'a93',
                        // 'いいえ' => 'last',
                        'いいえ' => 'a92',
                    ),
                );
                break;
            case "q11":
                $data = array(
                    'id' => $nextId,
                    'nextId' => 'last',
                    'questions' => array(
                        '過去に延滞経験はありますか？',
                    ),
                    'options' => array(
                        'はい' => 'a52',
                        'いいえ' => 'a50',
                    ),
                );
                break;
            case "last":
                $data = array(
                    'questions' => array(
                        'ありがとうございます。診断の結果、あなたは<span class="accent">[AMOUNT]万円</span>まで借りられます',
                        'ご回答頂いた情報からあなたにおすすめのカードローンをご紹介いたします！',
                    ),
                    // LINE
                    'options1' => array(
                        'promise',
                        'acom',
                        'mobit',
                        'aiful',
                    ),
                    // Tiktok
                    // 'options1' => array(
                    //     'acom',
                    //     'promise',
                    //     'mobit',
                    //     'aiful',
                    // ),
                    // Facebook
                    // 'options1' => array(
                    //     'promise',
                    //     'acom',
                    //     'mobit',
                    //     'aiful',
                    // ),
                    // Youtube short
                    // 'options1' => array(
                    //     'promise',
                    //     'acom',
                    //     'mobit',
                    //     'aiful',
                    // ),
                    'options2' => array(
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