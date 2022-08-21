import { createContext, ReactElement, useContext } from 'react';
import { FakeAuthService, IAuthService } from './AuthServices';
import { FakeHttpClient, IHttpClient } from './httpClient';
interface ServiceProviders {
  authService: IAuthService;
  httpClient: IHttpClient;
}

export const defaultProvider: ServiceProviders = {
  authService: new FakeAuthService(),
  httpClient: FakeHttpClient(),
};

const DepsContext = createContext<ServiceProviders>({
  authService: new FakeAuthService(),
  httpClient: FakeHttpClient(),
});

export function useDeps() {
  return useContext(DepsContext);
}

export function DepsProvider({
  children,
  services,
}: {
  children: ReactElement;
  services: ServiceProviders;
}) {
  return <DepsContext.Provider value={services}>{children}</DepsContext.Provider>;
}
