  namespace myRegEx  {
    export const hh = {
      buttonSeat:  /Seat #(\d) is the button/,
      playerNicks:  /(^.+?)(?=\(\$\d+)/,
      pot: /Total pot \$((\d+)(\.\d+)?)/,
      stakes: /\(([^\/]+)\/([^\)]+)\)/,
      time:  /\[(\d\d\d\d)[/](\d\d)[/](\d\d)\s(\d\d?):(\d\d):(\d\d)/,
      board: /Board \[([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])\s([2-9|T|J|Q|K|A][s|c|d|h])[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?[\]|\s]([2-9|T|J|Q|K|A][s|c|d|h])?/,
      heroName: /Dealt to (.+?(?=[[][2-9|T|J|Q|K|A][s|c|d|h]\s[2-9|T|J|Q|K|A][s|c|d|h]))/,
      heroCards: /[[]([2-9|T|J|Q|K|A][s|c|d|h](?:\s[2-9|T|J|Q|K|A][s|c|d|h]){1,3})/
    }
  }
