// Modified Type definitions for Greasemonkey 4+
// Project: http://www.greasespot.net/
// Original Definitions by: Kota Saito <https://github.com/kotas>
// Original Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// This definition is based on the API reference of Greasemonkey.
// http://wiki.greasespot.net/Greasemonkey_Manual:API

////////////////
// Global variable
////////////////

/**
 * Window object of the content page where the user script is running on.
 * @see {@link http://wiki.greasespot.net/UnsafeWindow}
 */
declare var unsafeWindow: Window;

declare namespace GM {
    /**
     * Meta data about the running user script.
     * @see {@link http://wiki.greasespot.net/GM.info}
     */
    export var info: {
        script: {
            description: string;
            excludes: string[];
            includes: string[];
            matches: string[];
            name: string;
            namespace: string;
            resources: Object;
            "run-at": string
            version: string;
        };
        scriptMetaStr: string;
        scriptHandler: string;
        version: string;
    };

    ////////////////
    // Values
    ////////////////

    /**
     * Deletes an existing name / value pair from the script storage.
     * @param  name  a name of the pair to delete.
     * @see    {@link http://wiki.greasespot.net/GM.deleteValue}
     */
    export function deleteValue(name: string): Promise<void>;

    /**
     * Retrieves a value from the script storage.
     * @param    name          a name to retrieve.
     * @param    defaultValue  a value to be returned when the name does not exist.
     * @returns  a retrieved value, or passed default value, or undefined.
     * @see      {@link http://wiki.greasespot.net/GM.getValue}
     */
    export function getValue(name: string, defaultValue?: any): Promise<any>;
    export function getValue(name: string, defaultValue?: string): Promise<string>;
    export function getValue(name: string, defaultValue?: number): Promise<number>;
    export function getValue(name: string, defaultValue?: boolean): Promise<boolean>;

    /**
     * Retrieves an array of names stored in the script storage.
     * @returns  an array of names in the storage.
     * @see      {@link http://wiki.greasespot.net/GM.listValues}
     */
    export function listValues(): Promise<string[]>;

    /**
     * Stores a name / value pair to the script storage.
     * @param  name   a name of the pair.
     * @param  value  a value to be stored.
     * @see    {@link http://wiki.greasespot.net/GM.setValue}
     */
    export function setValue(name: string, value: string): Promise<void>;
    export function setValue(name: string, value: boolean): Promise<void>;
    export function setValue(name: string, value: number): Promise<void>;

    ////////////////
    // Resources
    ////////////////

    /**

    /**
     * Gets a URL of a resource defined by {@link http://wiki.greasespot.net/Metadata_Block#.40resource|@resource}.
     * @param    resourceName  a name of the resource.
     * @returns  a URL that returns the content of the resource.
     * @see      {@link http://wiki.greasespot.net/GM.getResourceURL}
     */
    export function getResourceURL(resourceName: string): Promise<string>;

    ////////////////
    // Other
    ////////////////

    /**
     * Displays a notification to the user.
     * @param  text  The main notification text.
     * @param  title  The title of the notification.
     * @param  image  The URL for an image to display in the dialog.
     * @param  onclick  callback, triggered when the notification's button is clicked.
     * @see    {@link http://wiki.greasespot.net/GM.addStyle}
     */
    export function notification(text: string, title: string, image?: string, onclick?: Function): void;

    /**
     * Opens a URL in a new tab.
     * @param    url  a URL to open.
     * @param    open_in_background force tab to/to not open in a background tab
     * @see      {@link http://wiki.greasespot.net/GM.openInTab}
     */
    export function openInTab(url: string, open_in_background?: boolean): void;

    /**
     * Sets a text to the clipboard of the opeating system.
     * @param  text  a text to be set to the clipboard.
     * @see    {@link http://wiki.greasespot.net/GM.setClipboard}
     */
    export function setClipboard(text: string): void;

    ////////////////
    // Other - XMLHttpRequest
    ////////////////

    /**
     * Request options for {@link xmlHttpRequest}.
     * @see {@link http://wiki.greasespot.net/GM.xmlHttpRequest#Arguments}
     */
    export interface XMLHttpRequestOptions {
        binary?: boolean;
        context?: any;
        data?: string;
        headers?: Object;
        method: string;
        onabort?: (response: XMLHttpRequestResponse) => any;
        onerror?: (response: XMLHttpRequestResponse) => any;
        onload?: (response: XMLHttpRequestResponse) => any;
        onprogress?: (response: XMLHttpRequestProgressResponse) => any;
        onreadystatechange?: (response: XMLHttpRequestResponse) => any;
        ontimeout?: (response: XMLHttpRequestResponse) => any;
        overrideMimeType?: string;
        password?: string;
        synchronous?: boolean;
        timeout?: number;
        upload?: {
            onabort?: (response: XMLHttpRequestResponse) => any;
            onerror?: (response: XMLHttpRequestResponse) => any;
            onload?: (response: XMLHttpRequestResponse) => any;
            onprogress?: (response: XMLHttpRequestProgressResponse) => any;
        };
        url: string;
        user?: string;
    }

    /**
     * Response object for general events of {@link xmlHttpRequest}.
     * @see {@link http://wiki.greasespot.net/GM.xmlHttpRequest#Response_Object}
     */
    export interface XMLHttpRequestResponse {
        readyState: number;
        responseHeaders: string;
        responseText: string;
        status: number;
        statusText: string;
        context: any;
        finalUrl: string;
    }

    /**
     * Response object for onprogress event of {@link xmlHttpRequest}.
     */
    export interface XMLHttpRequestProgressResponse extends XMLHttpRequestResponse {
        lengthComputable: boolean;
        loaded: number;
        total: number;
    }

    /**
     * Sends a HTTP request to a URL.
     * @param    details  options and callbacks for HTTP request.
     * @see      {@link https://wiki.greasespot.net/GM.xmlHttpRequest}
     */
    export function xmlHttpRequest(details: XMLHttpRequestOptions): void;
}