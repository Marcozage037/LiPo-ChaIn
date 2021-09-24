import { Application } from '@phosphor/application';
import { Widget } from '@phosphor/widgets';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
/**
 * The widget plugin.
 */
declare const plugin: {
    id: string;
    requires: import("@lumino/coreutils").Token<IJupyterWidgetRegistry>[];
    activate: typeof activateWidgetExtension;
    autoStart: boolean;
};
export default plugin;
/**
 * Activate the widget extension.
 */
declare function activateWidgetExtension(app: Application<Widget>, registry: IJupyterWidgetRegistry): void;
