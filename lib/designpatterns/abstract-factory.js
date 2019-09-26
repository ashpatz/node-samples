'use strict';

//-------------------- PRODUCT INTERFACES --------------------
class Button {
    render () {throw new TypeError("not implemented");}
}

class Checkbox {
    render () {throw new TypeError("not implemented");}
}

//-------------------- ABSTRACT FACTORY --------------------

class GuiFactory {

    createButton() {throw new TypeError("not implemented");}

    createCheckbox() {throw new TypeError("not implemented");}
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

class WindowsButton extends Button { //--------------- CONCRETE PRODUCT ---------------
    render() {console.log("Rendering windows button");}
}

class MacButton extends Button {
    render() {console.log("Rendering mac button");}
}

class WindowsCheckbox extends Checkbox {
    render() {console.log("Rendering windows checkbox");}
}

class MacCheckbox extends Checkbox {
    render() {console.log("Rendering mac checkbox");}
}

class MacGuiFactory extends GuiFactory { //--------------- CONCRETE FACTORY ---------------

    createButton() {return new MacButton();}

    createCheckbox() {return new MacCheckbox();}
}

class WindowsGuiFactory extends GuiFactory {

    createButton() {return new WindowsButton();}

    createCheckbox() {return new WindowsCheckbox();}
}


if(process.platform === 'darwin') {
    new Application(new MacGuiFactory()).doSomething();
} else if(process.platform === 'win32') {
    new Application(new WindowsGuiFactory()).doSomething();
}
