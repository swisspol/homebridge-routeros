import type {
  CharacteristicValue,
  PlatformAccessory,
  Service,
} from 'homebridge';

import type { ExampleHomebridgePlatform } from './platform.js';

export class ExamplePlatformAccessory {
  // private fan: Service;

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    this.accessory
      .getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Mikrotik')
      .setCharacteristic(this.platform.Characteristic.Model, 'N/A')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'N/A');

    // this.fan =
    //   this.accessory.getService('Fan') ||
    //   this.accessory.addService(this.platform.Service.Fan, 'Fan', 'fan');
    // this.fan
    //   .getCharacteristic(this.platform.Characteristic.On)
    //   .onGet(this.getFan.bind(this))
    //   .onSet(this.setFan.bind(this));
  }

  // async getFan(): Promise<boolean> {
  //   this.platform.log.debug('Triggered getFan');
  //   const value = await this.readRegister(MODE_REGISTER);
  //   return value !== MODE_OFF;
  // }

  // async setFan(value: CharacteristicValue): Promise<void> {
  //   const on = value as boolean;
  //   this.platform.log.debug('Triggered setFan');
  //   this.writeRegister(MODE_REGISTER, on ? MODE_COMFORT_1 : MODE_OFF);
  // }
}
