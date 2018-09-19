import React from "react";
import { style, toast } from "react-toastify";
import { Header, Icon } from "semantic-ui-react";
// import { css } from "glamor";

export default class NotificationService {
    simple = (text, options) => this._show(text, options);
    extended = (title, subtitle, options) => {
      style({ width: "30rem" });
      const _options = { ...this.defaultOptions, ...options };
      const content =
          (
            <Header inverted as="h4" style={{ margin: "0.5rem 1rem" }}>
              {this._getIcon(_options) && <Icon name={this._getIcon(_options)} style={{ fontSize: "2em" }} />}
              <Header.Content>
                {title}<Header.Subheader>{subtitle}</Header.Subheader>
              </Header.Content>
            </Header>
          );
      return this._show(content, _options);
    }

    update(notification) {
      toast.update(notification.id, {
        render: notification.content,
        ...notification.options,
      });
    }
    _show(content, options) {
      style({ width: "30rem" });
      const _options = { ...this.defaultOptions, ...options };
      const id = toast(content, _options);
      return { id, content, _options };
    }
    _getIcon(options) {
      if (options.icon) return options.icon;
      return this._typeIconMatching[options.type];
    }
    _typeIconMatching = {
      info: "info circle",
      success: "check circle outline",
      warning: "warning sign",
      error: "minus circle",
      default: null,
    }
    defaultOptions = {
      type: "info",
      // options: info, success, warning, error, default
      position: "bottom-right",
      // options: top-left, top-right, top-center,
      // bottom-left, bottom-right, bottom-center
      autoClose: 5000, // [ms], set false to disable

    }
}
