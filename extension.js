const vscode = require('vscode');

function compile() { 
    vscode.window.showInformationMessage('Hello, world!')
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('HSP3-For-Visual-Studio-Code.Compile', compile));
	context.subscriptions.push(vscode.languages.registerHoverProvider(HSP3, new OreoreHoverProvider()));
}

function deactivate() {
    return undefined;
}

const HSP3 = { scheme: 'file', language: 'hsp3' };
class OreoreHoverProvider {
    provideHover(document, position, token) {
        let wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_]+/);
        if (wordRange === undefined) return Promise.reject("no word here");

        let currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
        return Promise.resolve(new vscode.Hover(currentWord));
    }
}

module.exports = { activate, deactivate };
