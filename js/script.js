

$(function() {
    var data = [
      {
        action: "type",
        strings: ["What are you gonna do..?"],
        output: '<br><br>',
        postDelay: 1000
      },
      {
        action: "type",
        strings: ["Loding...skill..."],
        output: '<br>',

        postDelay: 1000
      },
      {
        action: "type",
        strings: [" "],
        output: ' ',
        postDelay: 4000
      },
      {
        action: "type",
        strings: [" "],
        output: '<br>&nbsp;',
        postDelay: 2000
      }
    ];
    runScripts(data, 0);
  });
  
  function runScripts(data, pos) {
    var prompt = $(".prompt"),
      script = data[pos];
    if (script.clear === true) {
      $(".history").html("");
    }
    switch (script.action) {
      case "type":
        // cleanup for next execution
        prompt.removeData();
        $(".typed-cursor").text("");
        prompt.typed({
          strings: script.strings,
          typeSpeed: 10,
          callback: function() {
            var history = $(".history").html();
            history = history ? [history] : [];
            history.push(" " + prompt.text());
            if (script.output) {
              history.push(script.output);
              prompt.html("");
              $(".history").html(history.join(""));
            }
            // scroll to bottom of screen
            $("section.terminal").scrollTop($("section.terminal").height());
            // Run next script
            pos++;
            if (pos < data.length) {
              setTimeout(function() {
                runScripts(data, pos);
              }, script.postDelay || 1000);
            }
          }
        });
        break;
      case "view":
        break;
    }
  }
  



