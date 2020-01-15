'use strict';

class Computer {

    constructor(builder) {
        this._ram = builder.ram;
        this._cpu = builder.cpu;
        this._storage = builder.storage;
        this._screen = builder.screen;
        this._processors = builder.processors;
    }
}


class ComputerBuilder {

    setRam(ram) {
        this.ram = ram;
        return this;
    }
    setCpu(cpu) {
        this.cpu = cpu;
        return this;
    }
    setStorage(storage) {
        this.storage = storage;
        return this;
    }
    setScreen(screen) {
        this.screen = screen;
        return this;
    }

    build() {
        return new Computer(this);
    }
}


class ServerBuilder extends ComputerBuilder{
    setProcessors(processors) {
        this.processors = processors;
        return this;
    }
}

const myServer = new ServerBuilder()
// .setProcessors(2)
.setCpu(2.3)
.setRam(16)
.setScreen(13)
.setStorage(500)
.build();

console.log(myServer);