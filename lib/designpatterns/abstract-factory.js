'use strict';

class Button {
    render () {throw new TypeError("not implemented");}
}

class WindowsButton extends Button {
    render() {console.log("Rendering windows button");}
}

class MacButton extends Button {
    render() {console.log("Rendering mac button");}
}

class Checkbox {
    render () {throw new TypeError("not implemented");}
}

class WindowsCheckbox extends Checkbox {
    render() {console.log("Rendering windows checkbox");}
}

class MacCheckbox extends Checkbox {
    render() {console.log("Rendering mac checkbox");}
}

class GuiFactory {

    createButton() {throw new TypeError("not implemented");}

    createCheckbox() {throw new TypeError("not implemented");}
}

class MacGuiFactory extends GuiFactory {

    createButton() {return new MacButton();}

    createCheckbox() {return new MacCheckbox();}
}

class WindowsGuiFactory extends GuiFactory {

    createButton() {return new WindowsButton();}

    createCheckbox() {return new WindowsCheckbox();}
}

class Application {
    constructor(guiFactory) {
        this._button = guiFactory.createButton();
        this._checkbox = guiFactory.createCheckbox();
    }

    doSomething() {
        this._button.render();
        this._checkbox.render();
    }
}

if(process.platform === 'darwin') {
    new Application(new MacGuiFactory()).doSomething();
} else if(process.platform === 'win32') {
    new Application(new WindowsGuiFactory()).doSomething();
}
