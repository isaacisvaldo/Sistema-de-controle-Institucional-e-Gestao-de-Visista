import * as os from 'os';
import * as osUtils from 'os-utils';
import * as ip from 'ip';
import axios from 'axios';

interface DeviceInfo {
  deviceName: string;
  osType: string;
  osPlatform: string;
  osArch: string;
  cpuUsage: number;
  ipAddress: string;
  latitude?: number;
  longitude?: number;
}

 export async function getDeviceInfo(): Promise<DeviceInfo> {
  const deviceName: string = os.hostname();
  const osType: string = os.type();
  const osPlatform: string = os.platform();
  const osArch: string = os.arch();

  // Chama a função cpuUsage para obter o uso da CPU
  const cpuUsage: number = await new Promise((resolve) => {
    osUtils.cpuUsage((usage) => {
      resolve(usage);
    });
  });

  // Obtém o endereço IP do dispositivo
  const ipAddress: string = ip.address();

  // Obtém a localização usando a API de geolocalização baseada no IP
  try {
    const response = await axios.get('https://ipinfo.io/json');
    const { loc } = response.data;
    const [latitude, longitude] = loc.split(',').map(Number);

    // Retorna as informações do dispositivo com a localização
    return {
      deviceName,
      osType,
      osPlatform,
      osArch,
      cpuUsage,
      ipAddress,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error('Erro ao obter a localização:', error);

    // Retorna as informações do dispositivo sem a localização em caso de erro
    return {
      deviceName,
      osType,
      osPlatform,
      osArch,
      cpuUsage,
      ipAddress,
    };
  }
}

