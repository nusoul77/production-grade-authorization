import moment from "moment";
import colors from "colors";

class Logger {
  constructor(context) {
    this._context = context;
  }

  log(message, data) {
    console.log(this._messageBuilder(message, "INFO", "green"));

    if (data) {
      console.log(data);
    }
  }

  warn(message, data) {
    console.log(this._messageBuilder(message, "WARN", "yellow"));

    if (data) {
      console.log(data);
    }
  }

  error(message, data) {
    console.log(this._messageBuilder(message, "ERROR", "red"));

    if (data) {
      console.log(data);
    }
  }

  _messageBuilder(text, level, color) {
    return `${String(`[${level}]`)[color]} ${
      moment().format("HH:mm DD/MM/YYYY")[color]
    } - ${String(`[${this._context}]`).yellow} - ${text[color]}`;
  }
}

export default Logger;
