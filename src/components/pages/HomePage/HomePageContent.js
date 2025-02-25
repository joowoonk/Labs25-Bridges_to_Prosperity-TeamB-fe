import React, { useContext, useEffect } from 'react';
import { BridgesContext } from '../../../state/bridgesContext';
import { RenderMap } from '../DataViz/index';
import Navigation from '../../common/Navigation';
import Footer from '../../common/Footer';
import { getDSData } from '../../../api/index';

const HomePageReact = () => {
  const { setBridgeData } = useContext(BridgesContext);

  useEffect(() => {
    getDSData('https://bridges-to-prosperity.herokuapp.com').then(data => {
      setBridgeData(data);
    });
  }, [setBridgeData]);

  return (
    <div className="container">
      <Navigation />
      <RenderMap />
      <Footer />
    </div>
  );
};

export default HomePageReact;
