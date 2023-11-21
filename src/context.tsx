import * as React from 'react';
import * as MapboxGl from 'mapbox-gl';

export const MapContext = React.createContext<MapboxGl.Map | undefined>(
  undefined
);

export function withMap<T extends { map: MapboxGl.Map | undefined }>(
  Component: React.ComponentType<T>
) {
  return function MappedComponent(
    props: Omit<T, 'map'> & { map?: MapboxGl.Map | undefined }
  ) {
    return (
      <MapContext.Consumer>
        {mapFromContext => {
          const mergedProps = { ...props, map: props.map || mapFromContext };
          return <Component {...mergedProps as T} />;
        }}
      </MapContext.Consumer>
    );
  };
}
