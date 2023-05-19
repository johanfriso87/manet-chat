/**
 * 環境に応じてajax用のURLを生成する
 * @returns string url
 */
function getAjaxPath() {
  if (location.host == "localhost") {
    var ajaxPath = "command";
  } else {
    var ajaxPath = location.protocol + "//" + location.host + "/command";
  }
  // var ajaxPath = "https://gaihekitosou-support.jp/lp-55/command";

  return ajaxPath;
}

// ------------------------------
// タイマー
// ------------------------------

$(window).on("click", function (e) {
  console.log(e.target);
});

var start = new Date();
var timeData = {
  min: 0,
  sec: 0,
};
var now = 0;
var datet = 0;

function updateTime() {
  now = new Date();

  datet = parseInt((now.getTime() - start.getTime()) / 1000);

  timeData.min = parseInt((datet / 60) % 60);
  timeData.sec = datet % 60;
}

setInterval(updateTime, 1000);

// ------------------------------
// 100vh取得
// ------------------------------

$(window).on("load", function () {
  //画面高さ取得
  h = $(window).height();
  $("#modal-first").css("min-height", h + "px");
});

$(window).resize(function () {
  //画面リサイズ時の高さ取得
  h = $(window).height();
  $("#modal-first").css("min-height", h + "px");
});

$(function () {
  // GAイベント
  // gtag('event', 'FV', {
  //   'event_category' : 'FV',
  //   'event_label' : 'FV'
  // });

  // ------------------------------
  // パラメータ取得
  // ------------------------------

  get_params("ad");
  get_params("type");

  function get_params(paraName) {
    paraValue = paraGety(paraName);
    console.log("name:", paraName);

    if (paraValue != "") {
      console.log(paraName + "value:", paraValue);
      let inputHtml =
        '<input type="text" name="' + paraName + '" value="' + paraValue + '">';
      $("#results").append(inputHtml);
      return true;
    }

    console.log("params:disable");
    return false;
  }

  function paraGety(para) {
    console.log("para:", para);
    var pageURL = location.search.substring(1),
      urlValue = pageURL.split("&"),
      paraName;
    console.log("pageURL:", pageURL);
    console.log("urlValue:", urlValue);
    for (var i = 0; i < urlValue.length; i++) {
      paraName = urlValue[i].split("=");
      console.log("paraName:", paraName);
      if (paraName[0] === para) {
        console.log("paraName[1]:", paraName[1]);
        return paraName[1] === undefined
          ? true
          : decodeURIComponent(paraName[1]);
      }
    }
  }

  //ポップアップ非表示の判定
  let popAppend = false;
  var restraint_bar = false;

  //履歴の追加
  let hash = location.hash;
  if (hash != "#back") {
    history.pushState(null, null, location.href);
    history.replaceState(null, null, "#back");
  }

  //設定したハッシュタグが消えたら実行
  window.addEventListener("popstate", (e) => {
    if (
      location.hash != "#back" &&
      popAppend === false &&
      restraint_bar == false
    ) {
      $(".modal_restraint").fadeIn();
      popAppend = true;

      // イベントを登録
      window.addEventListener("beforeunload", onBeforeunloadHandler, false);
    }
  });

  // ------------------------------
  // 離脱でアラート
  // ------------------------------
  var onBeforeunloadHandler = function (e) {
    e.returnValue = "入力途中です。本当に移動しますか？";
  };

  // ------------------------------
  // モーダル消す
  // ------------------------------
  $(".modal_close").on("click", function () {
    if (location.hash != "#back" && popAppend === true) {
      history.pushState(null, null, location.href);
      history.replaceState(null, null, "#back");
      popAppend = false;
    }

    $(this).parents(".modal").hide();
    $("#modal-first .modal_container").css("opacity", 1);
    restraint_bar = false;
  });

  // ------------------------------
  // 離脱防止
  // ------------------------------
  let flg_final = false;
  $("#restraint_toucher").hover(
    function () {
      console.log("now");
      //フォーム表示中なら画像差し替え
      if ($(".user_form").length > 0) {
        $("#modal_final").show();
        $("#modal-first .modal_container").css("opacity", 0);

        if (flg_final == true) {
          $("#modal_final .late-open").removeClass("late-open");
          $("#modal_final .dot-flashing").remove();
          return;
        }

        let delayTime = 1500;
        let timeCount = 1;
        let time = timeData;
        let text = [
          "ちなみに…ここまで" +
            time.min +
            "分" +
            time.sec +
            "秒ほどお時間をいただいております。",
          "多くの方が、結局外壁塗装の窓口に戻って算定しているので、",
          "ここまで来たなら、今、結果を確認しておくことをおすすめします。",
        ];
        $.each(text, function (idx, elem) {
          let timing = delayTime * timeCount;
          timeCount++;
          let html = getAdminFukidashi(elem);
          setTimeout(function () {
            $("#modal_final_contents").append(html);
          }, timing);
        });
        flg_final = true;
      } else {
        $("#modal_restraint").show();
        $("#modal-first .modal_container").css("opacity", 0);
        restraint_bar = true;
      }
    },
    function () {}
  );

  // ------------------------------
  // 最初のモーダルの回答をクリック
  // ------------------------------
  $(".first-modal__option-btn").on("click", function () {
    $("body").addClass("first-modal-checked"); // SP時の実績アイコンを表示するためのクラス
    $("#modal-first").addClass("is-selected");
  });

  // ------------------------------
  // 選択肢クリック
  // ------------------------------
  $(document).on("click", ".option", function () {
    // イベント送信
    const itemId = $(this).parents(".option_list").data("itemid");
    const isScrollbar = $(this).data("is_scroll");
    const isMultiselect = $(this).data("is_multiselect");
    const isDropdown = $(this).data("is_dropdown");
    // gtag('event', 'question'+itemId, {
    //   'event_category' : 'click',
    //   'event_label' : itemId
    // });
    if (isScrollbar || isMultiselect || isDropdown) return;

    //情報取得
    let selected = $(this).data("selected");
    if (selected == "city_name") {
      alert(selected);
    }

    const nextId = $(this).data("next");

    if (nextId == "q1") {
      $(".first-modal__loading__container").show();
      setTimeout(function () {
        $(".first-modal__loading__container").hide();
        //送信データ用にHTML用意
        let inputHtml =
          '<input type="text" name="' + itemId + '" value="' + selected + '">';
        $("#results").append(inputHtml);

        //オプションを非表示にする
        removeOptionsHtml();

        scrollToBottom();

        //結果を吹き出しとして挿入
        setAnswerHtml(itemId, selected);

        //念のため「訂正する」非表示に
        $(".modify").addClass("modify--inactive");

        getNext(nextId);
      }, 1500);
    } else {
      //送信データ用にHTML用意
      let inputHtml =
        '<input type="text" name="' + itemId + '" value="' + selected + '">';
      $("#results").append(inputHtml);

      //オプションを非表示にする
      removeOptionsHtml();

      scrollToBottom();

      //結果を吹き出しとして挿入
      setAnswerHtml(itemId, selected);

      //念のため「訂正する」非表示に
      $(".modify").addClass("modify--inactive");

      getNext(nextId);
    }
  });

  $(document).on(
    "click",
    "input[type='checkbox'], .multi_list__item__label-text",
    function (event) {
      event.stopPropagation();
      if ($(event.target).is(".multi_list__item__label-text")) {
        const checkbox = $(event.target)[0].parentElement.getElementsByTagName(
          "input"
        )[0];
        checkbox.checked = !checkbox.checked;
      }
      const itemId = $(this).parents(".option_list").data("itemid");
      const checkedBoxes = $("input[type=checkbox]:checked");
      const nextButton = $(`#chat-next-btn-${itemId}`)[0];
      const enable = checkedBoxes.length > 0;
      if (enable) nextButton.removeAttribute("disabled");
      else nextButton.disabled = true;
      if (enable) {
        let selected = "";
        for (let i = 0; i < checkedBoxes.length; i++) {
          selected += checkedBoxes[i].dataset.selected + ", <br>";
        }
        selected = selected.slice(0, -6);
        nextButton.setAttribute("data-selected", selected);
      }
    }
  );

  $(document).on("input", "input[type='range']", function () {
    const itemId = $(this).parents(".option_list").data("itemid");
    $(`#scoped-rangeValue-${itemId}`).text($(this).val() + "万円");
    $(`#chat-next-btn-${itemId}`)[0].setAttribute(
      "data-selected",
      $(this).val() + "万円"
    );
  });

  $(document).on("click", ".range-minus", function () {
    const itemId = $(this).parents(".option_list").data("itemid");
    const range = $("input[type=range]");
    const current = Number(range.val());
    const step = Number(range.attr("step"));
    range.val(Math.max(0, current - step));
    $(`#scoped-rangeValue-${itemId}`).text(range.val() + "万円");
    $(`#chat-next-btn-${itemId}`)[0].setAttribute(
      "data-selected",
      $(this).val() + "万円"
    );
  });

  $(document).on("click", ".range-plus", function () {
    const itemId = $(this).parents(".option_list").data("itemid");
    const range = $("input[type=range]");
    const current = Number(range.val());
    const step = Number(range.attr("step"));
    range.val(Math.min(current + step, Number(range.attr("max"))));
    $(`#scoped-rangeValue-${itemId}`).text(range.val() + "万円");
    $(`#chat-next-btn-${itemId}`)[0].setAttribute(
      "data-selected",
      $(this).val() + "万円"
    );
  });

  $(document).on("change", ".select-job", function () {
    const itemId = $(this).parents(".option_list").data("itemid");
    const nextButton = $(`#chat-next-btn-${itemId}`)[0];
    const enable = $(this)[0].value != "";
    if (enable) {
      nextButton.removeAttribute("disabled");
      nextButton.setAttribute("data-selected", $(this)[0].textContent);
    } else nextButton.disabled = true;
  });

  $(document).on("click", ".chat__form-btn", function () {
    const itemId = $(this).data("itemid");
    const nextId = $(this).data("next");
    const selected = $(this)[0].dataset.selected;
    if (nextId == "q2" || nextId == "q3" || nextId == "q7" || nextId == "q8") {
      //送信データ用にHTML用意
      let inputHtml =
        '<input type="text" name="' + itemId + '" value="' + selected + '">';
      $("#results").append(inputHtml);

      //オプションを非表示にする
      removeOptionsHtml();

      scrollToBottom();

      //結果を吹き出しとして挿入
      setAnswerHtml(itemId, selected);

      //念のため「訂正する」非表示に
      $(".modify").addClass("modify--inactive");

      getNext(nextId);
    }
  });

  // ------------------------------
  // 訂正クリック
  // ------------------------------
  $(document).on("click", ".modify", function () {
    //Qmodal終了フラグ削除
    $("#modalEnd1").remove();
    $("#modalEnd2").remove();

    //回答に対応する質問ID
    let itemId = $(this).parents(".chat_user").data("itemid");

    //回答のindex番号
    let answerIndex = $("#chats .chat_item").index(
      $(this).parents(".chat_item")
    );

    //一番最初のユーザーコメントならリロードして終了
    if (answerIndex == 0) {
      location.reload();
      return;
    }

    //都道府県選択しなおし
    if (
      itemId == 2 ||
      itemId == 100 ||
      itemId == 101 ||
      itemId == 102 ||
      itemId == 103 ||
      itemId == 104 ||
      itemId == 105 ||
      itemId == 106 ||
      itemId == 107
    ) {
      $("#address_list").html("");
    }

    //回答・質問などを非表示
    $("#chats .chat_item").each(function (index, element) {
      if (index >= answerIndex) {
        $(element).remove();
      }
    });

    //選択肢をもとに戻す
    $("#chats .chat_options").last().show();

    //form内のinput削除
    let inputIndex = $("#results input").index(
      $('#results input[name="' + itemId + '"]')
    );
    $("#results input").each(function (index, element) {
      if (index >= inputIndex) {
        $(element).remove();
      }
    });
  });

  // ------------------------------
  // 市区町村クリック
  // ------------------------------
  $(document).on("click", "#address_select dd", function () {
    let city = $(this).text();
    console.log(city);

    $("#city_selected").text(city);
    $("#city_selected").data("selected", city);
    $("#city_selected").click();
  });

  // ------------------------------
  // 個人情報フォーム
  // ------------------------------
  $(document).on("keyup", ".user_form", function () {
    let tel = $("#tel").val();
    let tel_check = checkTel(tel);
    if (tel_check == true) {
      $("#user_form_btn").removeClass("inactive");
    } else {
      $("#user_form_btn").addClass("inactive");
    }
  });

  //送信処理
  // $(document).on("click", "#user_form_btn", function () {
  //   if ($(this).hasClass("inactive")) {
  //     alert("電話番号を入力してください");
  //     return;
  //   }

  //   let tel = $("#tel").val();
  //   $("#results").append('<input type="text" name="tel" value="' + tel + '">');

  //   //フォーム送信
  //   window.removeEventListener("beforeunload", onBeforeunloadHandler, false);

  //   // gtag('event', 'submit', {
  //   //   'event_category' : 'click',
  //   //   'event_label' : 'submit'
  //   // });

  //   $("#user_form_btn").addClass("inactive");
  //   $("#user_form_btn").prop("disabled", true);
  //   $(this).text("送信中…");

  //   try {
  //     $("#form").submit();
  //   } catch (e) {
  //     $("#user_form_btn").removeClass("is-disabled");
  //     $("#user_form_btn").prop("disabled", false);
  //     alert("送信に失敗しました。通信環境をご確認ください。");
  //   }
  // });

  // ------------------------------
  // Q-modal
  // ------------------------------

  // 回答タップ
  $(".js-set-value").on("click", function () {
    let id = $(this).attr("data-question-id");
    let name = $(this).attr("data-question-name");
    let val = $(this).attr("data-set-val");

    // gtag('event', 'question'+name, {
    //   'event_category' : 'click',
    //   'event_label' : name
    // });

    // モーダル消す
    for (var i = 1; i <= 7; i++) {
      $("#q-modal" + i).hide();
    }

    // 回答の上書き
    if ($('input[name="' + name + '"]').length) {
      $('input[name="' + name + '"]').remove();
    }

    // 値のセット
    let ans = '<input type="hidden" name="' + name + '" value="' + val + '">';
    $("#results").append(ans);

    // 選択結果セット
    $(".select" + id).html(val);

    // 次のモーダル出す
    if (id < 7) {
      let next = Number(id) + 1;
      $("#q-modal" + next).show();

      // クリック画像セット
      if (
        $(".select" + id)
          .parent()
          .hasClass("next")
      ) {
        $(".next").removeClass("next");
        $(".select" + next)
          .parent()
          .addClass("next");
      }
    } else {
      $(".select" + id)
        .parent()
        .removeClass("next");

      if ($("#modalEnd1").length == 0) {
        // チャット続き
        if (
          $('input[name="25"]').val() &&
          $('input[name="26"]').val() &&
          $('input[name="factory"]').val() &&
          $('input[name="oodori"]').val() &&
          $('input[name="27"]').val() &&
          $('input[name="24"]').val() &&
          $('input[name="28"]').val()
        ) {
          // 終了フラグ
          $("body").append("<div id='modalEnd1' style='display: none;'></div>");

          getNext(72);
        }
      } else {
        scrollToBottom();
      }
    }
  });

  $(".js-set-value2").on("click", function () {
    let id = $(this).attr("data-question-id");
    let name = $(this).attr("data-question-name");
    let val = $(this).attr("data-set-val");

    // gtag('event', 'question'+name, {
    //   'event_category' : 'click',
    //   'event_label' : name
    // });

    // モーダル消す
    for (var i = 8; i <= 14; i++) {
      $("#q-modal" + i).hide();
    }

    // 回答の上書き
    if ($('input[name="' + name + '"]').length) {
      $('input[name="' + name + '"]').remove();
    }

    // 値のセット
    let ans = '<input type="hidden" name="' + name + '" value="' + val + '">';
    $("#results").append(ans);

    // 選択結果セット
    $(".select" + id).html(val);

    // 次のモーダル出す
    if (id < 14) {
      let next = Number(id) + 1;
      $("#q-modal" + next).show();

      // クリック画像セット
      if (
        $(".select" + id)
          .parent()
          .hasClass("next")
      ) {
        $(".next").removeClass("next");
        $(".select" + next)
          .parent()
          .addClass("next");
      }
    } else {
      $(".select" + id)
        .parent()
        .removeClass("next");

      if ($("#modalEnd2").length == 0) {
        // チャット続き
        if (
          $('input[name="72"]').val() &&
          $('input[name="71"]').val() &&
          $('input[name="73"]').val() &&
          $('input[name="garage"]').val() &&
          $('input[name="parking"]').val() &&
          $('input[name="70"]').val() &&
          $('input[name="neiborhood"]').val()
        ) {
          // 終了フラグ
          $("body").append("<div id='modalEnd2' style='display: none;'></div>");

          if ($('input[name="10"]').val() == "屋根") {
            getNext(46);
          } else {
            getNext(35);
          }
        }
      } else {
        scrollToBottom();
      }
    }
  });

  // モーダル消す
  $(".js-q-modal-close").on("click", function () {
    console.log("close");
    $(this).parents(".q-modal").hide();
  });

  $(document).on("click", ".js-question-modal", function () {
    console.log(1);
    var classVal = $(this).attr("class");
    var classVals = classVal.split(" ");
    for (var i = 0; i < classVals.length; i++) {
      if (classVals[i].match("select") != null) {
        var id = Number(classVals[i].replace("select", ""));
      }
    }

    console.log(id);
    Qmodal(1, id);
  });

  $(document).on("click", ".js-question-modal2", function () {
    var classVal = $(this).attr("class");
    var classVals = classVal.split(" ");
    for (var i = 0; i < classVals.length; i++) {
      if (classVals[i].match("select") != null) {
        var id = Number(classVals[i].replace("select", ""));
      }
    }
    Qmodal(2, id);
  });
});

/**
 * ユーザーが入力した回答を表示
 * @param int id
 * @param string selected
 */
function setAnswerHtml(id, selected) {
  //ajax de json toru
  let url = getAjaxPath() + "/get_question.php";
  $.ajax(url, {
    type: "GET",
    data: { id: id },
    dataType: "json",
  })
    .done(function (data) {
      let replyText;
      if (selected == "わからない") {
        replyText = "わかりません";
      } else if (selected == "はい" || selected == "いいえ") {
        replyText = selected;
      } else if (selected.match(".*いる$")) {
        replyText = selected.replace("いる", "います");
      } else {
        replyText = selected + "です";
      }
      let chatHtml = "";
      chatHtml += '<div class="chat_item chat_user" data-itemid="' + id + '">';
      chatHtml += '<div class="chat_user_text">' + replyText + "</div>";
      chatHtml += '<div class="chat_user_correction">';
      chatHtml += '<span class="modify modify--inactive">訂正する</span>';
      chatHtml += "</div>";
      chatHtml += "</div>";
      $("#chats").append(chatHtml);
      scrollToBottom();
    })
    .fail(function (error) {
      console.log(error);
    });

  // let replyText = selected;
  // // if (data["type"] == "address") {
  // //   replyText = selected + "です";
  // // } else {
  // //   replyText = data["replies"][selected] ? data["replies"][selected] : selected;
  // // }
  // let chatHtml = "";
  // chatHtml += '<div class="chat_item chat_user" data-itemid="' + id + '">';
  // chatHtml += '<div class="chat_user_text">' + replyText + "</div>";
  // chatHtml += '<div class="chat_user_correction">';
  // chatHtml += '<span class="modify">訂正する</span>';
  // chatHtml += "</div>";
  // chatHtml += "</div>";
  // $("#chats").append(chatHtml);
}

// モーダル出す
function Qmodal(cnt, id) {
  if (cnt == 1) {
    for (var i = 1; i <= 7; i++) {
      $("#q-modal" + i).hide();
    }
  } else if (cnt == 2) {
    for (var i = 8; i <= 14; i++) {
      $("#q-modal" + i).hide();
    }
  }
  $("#q-modal" + id).show();
}

/**
 * 次の質問データをajaxで取得
 * @param int nextId
 */
function getNext(nextId) {
  let url = getAjaxPath() + "/get_question.php";

  $.ajax(url, {
    type: "GET",
    data: { id: nextId },
    dataType: "json",
  })
    .done(function (data) {
      setNextHtml(data);
    })
    .fail(function (error) {
      console.log(error);
    });
}

/**
 * 次の運営者コメントを順次表示
 * @param array data: getNext()の返り値
 */
function setNextHtml(data) {
  if (data["id"] == 1) {
    let pref = "";
    let city = "";

    for (let i = 100; i <= 107; i++) {
      if ($("input[name='" + i + "']").length)
        pref += $("input[name='" + i + "']").val();
    }

    city += $("input[name='54']").val();

    data["questions"] = [
      "かしこまりました！お調べいたします！",
      pref + city + "では、20～30万円の助成金がもらえる可能性があります！",
      "助成金は工事費用によって支給額が異なる為、費用の相場を算出いたします。",
      "まず、物件の種類を教えてください",
    ];
  }

  // 一戸建て以外の選択肢
  if (data["id"] == 10 && $('input[name="1"]').val() == "一戸建て以外") {
    data["questions"] = [
      "「" + $('input[name="3"]').val() + "」ですね！",
      "今回査定したい箇所はどちらですか？",
    ];
  }

  // 屋根を選択した場合 -------------------------
  if ($('input[name="10"]').val() == "屋根") {
    // 20 → 21（分岐）
    // 延べ床面積 → 屋根はどのような形ですか？
    if (data["id"] == 17) {
      data["options"] = {
        "51〜100㎡<br>(15〜30坪)": 21,
        "101〜150㎡<br>(31〜45坪)": 21,
        "151〜200㎡<br>(45〜60坪)": 21,
        その他: 21,
        わからない: 21,
      };
    }

    // 20 → 21（分岐）
    // 以下から当てはまるものを選択してください。
    if (data["id"] == 19) {
      data["options"] = {
        "50㎡(15坪以下)": 21,
        "201㎡(60坪以上)": 21,
        わからない: 21,
      };
    }

    // 35 → 46（分岐）
    // 隣の家から1メートル以上の幅はありますか？
    // → 屋根の工事経験はありますか？
    if (data["id"] == "neiborhood") {
      data["options"] = {
        はい: 46,
        いいえ: 46,
      };
    }
    // 太陽光パネルを0円で設置できる
    // → 屋根の工事経験はありますか？
    if (data["id"] == "solar2") {
      data["options"] = {
        はい: 46,
        いいえ: 46,
      };
    }

    // 52 → 53 （分岐）
    // → これまで外壁の工事費用の見積もりをもらったことはありますか？
    if (data["id"] == 43) {
      data["options"] = {
        "1ヶ月以内": 53,
        "3ヶ月以内": 53,
        半年以内: 53,
        "1年以内": 53,
        "1年超": 53,
        "施工済・施工予定なし": 53,
      };
    }
  }

  // 外壁＆屋根を選択した場合 -------------------------
  if ($('input[name="10"]').val() == "外壁と屋根") {
    // oodori → 21 （折り返す）
    // 現在の外壁材はどのようなものをお使いですか？
    // → 屋根はどのような形ですか
    if (data["id"] == 20) {
      data["options"] = {
        モルタル: 21,
        サイディング: 21,
        タイル: 21,
        ALC: 21,
        その他: 21,
        よくわからない: 21,
      };
    }

    // 42or43 → 46（折り返す）
    // これまでに、屋根の工事をしたことはありますか？
    if (data["id"] == 40) {
      data["options"] = {
        はい: 46,
        いいえ: 46,
        わからない: 46,
      };
    }

    /*
    // 火災保険に加入していますか？ or 施工時期
    if (data["id"] == "amamori1") {

      // 外壁の剥がれがある場合
      if ($('input[name="40"]').val() == "はい") {
        data["options"] = {
          "はい": 42,
          "いいえ": 42,
          "わからない": 42
        };
      }
    }
    */

    // 80 → 53 （折り返し）,
    // これまで外壁の工事費用の見積もりをもらったことはありますか？
    // → 屋根の見積もり
    if (data["id"] == 52) {
      data["options"] = {
        はい: 53,
        いいえ: 53,
      };
    }
  }

  //チョーキング
  if (data["id"] == 38 && $('input[name="36"]').val() == "いいえ") {
    data["questions"].shift();
  }

  //ひび
  if (data["id"] == "kabi" && $('input[name="38"]').val() == "いいえ") {
    data["questions"].shift();
  }

  //55番調整
  if (data["id"] == 55) {
    let time = timeData;

    data["questions"] = [
      "かしこまりました。",
      `20個の質問に${time.min}分${time.sec}秒ほどかけてご回答頂きましたが、あと少しで算定完了になります！`,
      "30秒ほどで結果を送付いたしますので、ショートメッセージ送付先のご入力をお願いします。",
    ];
  }

  // お断り
  if (data["id"] == "present") {
    if (
      $('input[name="52"]').val() == "はい" ||
      $('input[name="53"]').val() == "はい"
    ) {
      data["questions"].unshift(
        "他社の見積もり中でも大丈夫です。他の業者のお断りも代行します"
      );
    }
  }

  const QuestionData = [
    {
      id: 25,
      question: "物件は、海から近いですか？",
      next: 26,
      class: "select1",
    },
    {
      id: 26,
      question: "近所に川や湖はありますか？",
      next: "factory",
      class: "select2",
    },
    {
      id: "factory",
      question: "近所に工場はありますか？",
      next: "oodori",
      class: "select3",
    },
    {
      id: "oodori",
      question: "大通りの道路や車通りが多い面に接してますか？",
      next: 27,
      class: "select4",
    },
    {
      id: 27,
      question: "日当たりのよい立地ですか？",
      next: 24,
      class: "select5",
    },
    {
      id: 24,
      question: "山や林のなかに建っていますか？",
      next: 28,
      class: "select6",
    },
    {
      id: 28,
      question: "高台に建っていますか？",
      next: 72,
      class: "select7",
    },
  ];

  const QuestionData2 = [
    {
      id: 72,
      question: "庭・ベランダなどに移動が困難なものはございますか？",
      next: 71,
      class: "select8",
    },
    {
      id: 71,
      question: "室外機はいくつございますか？",
      next: 73,
      class: "select9",
    },
    {
      id: 73,
      question: "敷地内に車を駐車してますか？",
      next: "garage",
      class: "select10",
    },
    {
      id: "garage",
      question: "車庫は設置されてますか？",
      next: "parking",
      class: "select11",
    },
    {
      id: "parking",
      question: "施工会社の車を近くに駐車できる場所はありますか？",
      next: 70,
      class: "select12",
    },
    {
      id: 70,
      question: "テレビやBSなどのアンテナを設置していますか？",
      next: "neiborhood",
      class: "select13",
    },
    {
      id: "neiborhood",
      question: "隣の家から1メートル以上の幅はありますか？",
      next: 35,
      class: "select14",
    },
    /*
    {
      "id": "solar",
      "question": "屋根上に太陽光パネルを設置していますか？",
      "next": 35,
      "class": "select15"
    }
    */
  ];

  //チャット挿入欄
  let $chats = $("#chats");

  //遅延表示
  // let timeDelay = 0;
  let timeDelay = 1300;
  let count = 0;

  //質問文を表示
  $.each(data["questions"], function (idx, elem) {
    if (data["type"] == "last") {
      const amount = Math.floor(
        Number($('input[name="q7"]')?.val().slice(0, -2)) / 3
      );
      elem = elem.replace("[AMOUNT]", amount);
    }
    count++;

    let time = timeDelay * count;
    let html = "";
    html += '<div class="chat_item chat_admin">';

    //画像指定なら
    let match = elem.match(/^img(.*)/);

    if (match != null) {
      let img = getAjaxPath() + "/../assets/img/" + data["images"][match[1]];
      html += '<img class="chat_admin_center-img" src="' + img + '">';
    } else if (elem == "input") {
      QmodalFlg = 1;
      html += '<div class="q-select">';

      var cnt = 1;
      QuestionData.forEach(function (item) {
        html += '<div class="q-select-item">';
        html += '<div class="q-select-item-title">' + item.question + "</div>";
        if (cnt == 1) {
          html +=
            '<div class="q-select-item-form next"><button class="js-question-modal select' +
            cnt +
            '">選択してください</button></div>';
        } else {
          html +=
            '<div class="q-select-item-form"><button class="js-question-modal select' +
            cnt +
            '">選択してください</button></div>';
        }
        html += "</div>";
        cnt += 1;
      });

      html += "</div>";

      $(".modify").removeClass("modify--inactive");
    } else if (elem == "input2") {
      QmodalFlg = 2;
      html += '<div class="q-select">';

      var cnt = 8;
      QuestionData2.forEach(function (item) {
        html += '<div class="q-select-item">';
        html += '<div class="q-select-item-title">' + item.question + "</div>";
        if (cnt == 8) {
          html +=
            '<div class="q-select-item-form next"><button class="js-question-modal2 select' +
            cnt +
            '">選択してください</button></div>';
        } else {
          html +=
            '<div class="q-select-item-form"><button class="js-question-modal2 select' +
            cnt +
            '">選択してください</button></div>';
        }
        html += "</div>";
        cnt += 1;
      });

      html += "</div>";

      $(".modify").removeClass("modify--inactive");
    } else {
      QmodalFlg = 0;
      html += '<div class="chat_admin_img"></div>';
      html += '<div class="chat_admin_info">';
      html += '<div class="chat_admin_name">マネット</div>';
      html += '<div class="chat_admin_text">';
      html += '<div class="dot-flashing"></div>';
      html += '<span class="late-open">' + elem + "</span>";
      html += "</div>";
      html += "</div>";
    }
    html += "</div>";

    if (QmodalFlg == 1) {
      setTimeout(function () {
        $("#q-modal1").show();
      }, time + 2000);

      setTimeout(function () {
        $chats.append(html);
        scrollToBottom();
      }, time + 2500);
    } else if (QmodalFlg == 2) {
      $("#q-modal8").show();
      $chats.append(html);
      scrollToBottom();
    } else {
      setTimeout(function () {
        $chats.append(html);
        scrollToBottom();
      }, time);
    }
  });

  //選択肢のタイプを確認
  let type = data["type"] == undefined ? "default" : data["type"];

  //選択肢のHTMLを作成
  count++;
  time = timeDelay * count;
  let optionsHtml = "";

  //通常選択肢
  if (type == "default") {
    let half = Object.keys(data["options"] || [])?.length == 2 ? true : false;
    if (half == true) {
      optionsHtml +=
        '<div class="chat_item chat_options admin_chat_options admin_chat_options--half">';
    } else {
      optionsHtml += '<div class="chat_item chat_options admin_chat_options">';
    }
    optionsHtml += `<ul class="option_list" data-itemid="${data["id"]}">`;
    if (data["nextId"])
      $.each(data["options"], function (index, item) {
        optionsHtml += `<li class="option" data-selected="${item}" data-reply="${data["replies"]}" data-next="${data["nextId"]}"><span>${item}</span></li>`;
      });
    else
      $.each(data["options"], function (item, nextId) {
        optionsHtml += `<li class="option" data-selected="${item}" data-reply="${data["replies"]}" data-next="${nextId}"><span>${item}</span></li>`;
      });
    optionsHtml += "</ul>";
    optionsHtml += "</div>";
  } else if (type == "multiselect") {
    optionsHtml +=
      '<div class="chat_item chat_options admin_chat_options admin_chat_options--multiselect">';
    optionsHtml += '<ul class="option_list" data-itemid="' + data["id"] + '">';

    optionsHtml +=
      '<li class="option" data-selected="" data-next="" data-is_multiselect="true">';
    $.each(data["options"], function (index, item) {
      optionsHtml += `
        <div class="multi_list__item__label">
          <div class="multi_list__item__label-check">
            <input type="checkbox" data-selected="${item}" name="multi-item[]" value="${index}">
          </div>
          <div class="multi_list__item__label-text">${item}</div>
        </div>
      `;
    });
    optionsHtml += "</li>";
    optionsHtml += "</ul>";

    optionsHtml += `
      <div class="chat_next_btn_wrap">
        <button type="button" id="chat-next-btn-${data["id"]}" data-itemid="${data["id"]}" class="chat__form-btn" data-selected="" data-next="${data["nextId"]}" disabled>次に進む</button>
      </div>
    `;

    optionsHtml += "</div>";
  } else if (type == "scrollbar") {
    optionsHtml +=
      '<div class="chat_item chat_options admin_chat_options admin_chat_options--scroll">';
    optionsHtml += '<ul class="option_list" data-itemid="' + data["id"] + '">';

    optionsHtml +=
      '<li class="option" data-selected="" data-next="" data-is_scroll="true">';
    optionsHtml += `<div id="scoped-rangeValue-${data["id"]}">0万円</div>`;
    optionsHtml += '<div class="scoped-rangeBox">';
    optionsHtml += `<button type="button" class="range-minus" id="range-minus-${data["id"]}">-</button>`;
    optionsHtml += `<input type="range" id="range-${
      data["id"]
    }" name="loan_amount" min="0" max="${
      data["id"] == "q2" ? 500 : 1000
    }" step="10" value="0">`;
    optionsHtml += `<button type="button" class="range-plus" id="range-plus-${data["id"]}">+</button>`;
    optionsHtml += "</div>";
    optionsHtml += "</li>";
    optionsHtml += "</ul>";

    optionsHtml += `
      <div class="chat_next_btn_wrap">
        <button type="button" id="chat-next-btn-${data["id"]}" data-itemid="${data["id"]}" class="chat__form-btn" data-selected="" data-next="${data["nextId"]}">次に進む</button>
      </div>
    `;
    optionsHtml += "</div>";
  } else if (type == "dropdown") {
    optionsHtml += `
      <div class="chat_item chat_options admin_chat_options admin_chat_options--dropdown">
        <ul class="option_list" data-itemid="${data["id"]}">
          <li class="option" data-selected="" data-next="" data-is_dropdown="true">
            <select name="inquiry_job" id="select-job" class="select-job">
              <option value="">選択してください</option>
    `;
    $.each(data["options"], function (index, item) {
      optionsHtml += `
        <option value="${index}">${item}</option>
      `;
    });
    optionsHtml += `
            </select>
          </li>
        </ul>
        
        <div class="chat_next_btn_wrap">
          <button type="button" id="chat-next-btn-${data["id"]}" data-itemid="${data["id"]}" class="chat__form-btn" data-selected="" data-next="${data["nextId"]}" disabled>次に進む</button>
        </div>
      </div>
    `;
  } else if (type == "last") {
    const options = isPurpleAnswer() ? data["options2"] : data["options1"];
    optionsHtml += `<div class="chat_item chat_options user_form_wrapper">`;
    $.each(options, function (index, item) {
      optionsHtml += `<a href="#" class="user_form_btn ${item}"></a>`;
    });
    optionsHtml += `</div>`;

    // 算定完了のチャットを15秒後に追加
    // setTimeout(() => {
    //   let lastChatHtml = `
    //     <div class="chat_item chat_admin">
    //       <div class="chat_admin_img"></div>
    //       <div class="chat_admin_info">
    //         <div class="chat_admin_name">マネット</div>
    //         <div class="chat_admin_text">
    //           <div class="dot-flashing"></div>
    //           <span class="late-open">今すぐ確認してみる</span>
    //         </div>
    //       </div>
    //     </div>
    //   `;
    //   $(".user_form_wrapper").before(lastChatHtml);
    // }, 5000);
  }

  //表示
  setTimeout(function () {
    $chats.append(optionsHtml);
    scrollToBottom();

    if (type == "dropdown")
      new Choices("#select-job", {
        searchEnabled: false,
        shouldSort: false,
        placeholderValue: "",
        searchPlaceholderValue: "",
      });

    //最後に「訂正する」を戻す
    $(".modify").removeClass("modify--inactive");
  }, time);
}

/**
 * ページ最下部までスクロール
 */
function scrollToBottom() {
  var element = document.documentElement;
  var bottom = element.scrollHeight - element.clientHeight;
  // window.scroll(0, bottom);
  $("html, body").animate({ scrollTop: bottom }, 200, "swing");
}

function removeOptionsHtml() {
  $("#chats .chat_options").hide();
}

function isPurpleAnswer() {
  const a6 = $('input[name="q6"]')?.val();
  const a7 = $('input[name="q7"]')?.val().slice(0, -2);
  const a8 = $('input[name="q8"]')?.val();
  const a10 = $('input[name="q10"]')?.val();

  let result =
    ["無職", "パート/アルバイト"].includes(a6) ||
    a7 <= 300 ||
    a8 == "いいえ" ||
    (a10 && a10 == "はい");

  console.log("IS PURPLE:", result);
  return result;
}
