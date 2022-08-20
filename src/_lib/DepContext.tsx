import { createContext, ReactElement, useContext } from 'react';
import { FakeAuthService, IAuthService } from './AuthServices';
interface ServiceProviders {
  authService: IAuthService;
}

const DepsContext = createContext<ServiceProviders>({
  authService: new FakeAuthService(),
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
