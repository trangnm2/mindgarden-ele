// KHONG SUA KHI DOI GAME
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useDeviceDetection, DeviceType } from '@/fe/hooks';
import { getAssets, AssetSet, getUIConfig, UIConfigType } from '@/fe/theme';

interface DeviceContextType {
  deviceType: DeviceType;
  assets: AssetSet;
  uiConfig: UIConfigType;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

interface DeviceProviderProps {
  children: ReactNode;
  forcedDeviceType?: DeviceType;
}

export const DeviceProvider = ({ children, forcedDeviceType }: DeviceProviderProps) => {
  const autoDeviceType = useDeviceDetection();
  
  const deviceType = forcedDeviceType ?? autoDeviceType;
  const assets = getAssets(deviceType);
  const uiConfig = getUIConfig(deviceType);

  useEffect(() => {
    document.body.classList.toggle('is-mobile', deviceType === 'mobile');
  }, [deviceType]);

  return (
    <DeviceContext.Provider value={{ deviceType, assets, uiConfig }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }
  return context;
};
