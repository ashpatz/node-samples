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

class GuiFactory {

    getButton() {
        throw new TypeError("not implemented")
    }

    doSomething () {
        const button = this.getButton();
        button.render();
    }
}

class WindowsGuiFactory extends GuiFactory {
    getButton() {return new WindowsButton();}
}

class MacGuiFactory extends GuiFactory {
    getButton() {return new MacButton();}
}

if(process.platform === 'darwin') {
    new MacGuiFactory().doSomething();
} else if(process.platform === 'win32') {
    new WindowsGuiFactory().doSomething();
}