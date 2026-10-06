(function (Scratch) {
    'use strict';

    class MolliDevice {

        constructor() {
            // The forced device.
            // null = use the real device.
            this.forcedDevice = null;
        }

        getInfo() {
            return {
                id: 'mollidevice',
                name: 'MolliDevice',

                color1: '#6C5CE7',
                color2: '#5849C4',
                color3: '#4839A8',

                blocks: [
                    {
                        opcode: 'getDevice',
                        blockType: Scratch.BlockType.REPORTER,
                        text: "User's Device"
                    },

                    {
                        opcode: 'forceDevice',
                        blockType: Scratch.BlockType.COMMAND,
                        text: "Force enter device [DEVICE]",
                        arguments: {
                            DEVICE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'devices',
                                defaultValue: 'Desktop'
                            }
                        }
                    }
                ],

                menus: {
                    devices: {
                        acceptReporters: false,
                        items: [
                            'Mobile',
                            'Desktop',
                            'Console'
                        ]
                    }
                }
            };
        }

        getDevice() {

            // If a device has been forced,
            // return that instead of detecting the real device.
            if (this.forcedDevice !== null) {
                return this.forcedDevice;
            }

            const ua = String(
                navigator.userAgent || ''
            ).toLowerCase();

            // Console
            if (
                ua.includes('playstation') ||
                ua.includes('xbox') ||
                ua.includes('nintendo') ||
                ua.includes('switch')
            ) {
                return 'Console';
            }

            // Modern browser detection
            if (
                navigator.userAgentData &&
                typeof navigator.userAgentData.mobile === 'boolean'
            ) {
                return navigator.userAgentData.mobile
                    ? 'Mobile'
                    : 'Desktop';
            }

            // iPhone / iPod
            if (
                ua.includes('iphone') ||
                ua.includes('ipod')
            ) {
                return 'Mobile';
            }

            // Android phones
            if (
                ua.includes('android') &&
                ua.includes('mobile')
            ) {
                return 'Mobile';
            }

            // iPad
            if (ua.includes('ipad')) {
                return 'Mobile';
            }

            // Windows Phone
            if (ua.includes('windows phone')) {
                return 'Mobile';
            }

            // Default
            return 'Desktop';
        }

        forceDevice(args) {
            const device = String(args.DEVICE);

            if (
                device === 'Mobile' ||
                device === 'Desktop' ||
                device === 'Console'
            ) {
                this.forcedDevice = device;
            }
        }
    }

    Scratch.extensions.register(new MolliDevice());

})(Scratch);