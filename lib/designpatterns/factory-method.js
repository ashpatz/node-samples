'use strict';

//-------------------- PRODUCT INTERFACES --------------------
class Button {
    render () {throw new TypeError("not implemented");}
}


//-------------------- CREATOR (ABSTRACT) --------------------
class GuiFactory {

    //------ FACTORY METHOD ------
    getButton() {
        throw new TypeError("not implemented")
    }

    doSomething () {
        const button = this.getButton();
        button.render();
    }
}

class WindowsButton extends Button {
    render() {console.log("Rendering windows button");}
}

class MacButton extends Button { //--------------- CONCRETE PRODUCT ---------------
    render() {console.log("Rendering mac button");}
}

class WindowsGuiFactory extends GuiFactory {
    getButton() {return new WindowsButton();}
}

class MacGuiFactory extends GuiFactory { //--------------- CONCRETE CREATOR ---------------
    getButton() {return new MacButton();}
}

if(process.platform === 'darwin') {
    new MacGuiFactory().doSomething();
} else if(process.platform === 'win32') {
    new WindowsGuiFactory().doSomething();
}