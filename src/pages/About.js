import { Col, Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom';
import './About.scss';
import Bahnaric from './Bahnaric/Bahnaric';
import DataAugmentation from './DataAugmentation/DataAugmentation';
import Model from './Model/Model';
import Preprocessing from './Preprocessing/Preprocessing';
import References from './References/References';

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const [currentSection, setCurrentSection] = useState('bahnaric');

  const handleSectionChange = (e) => {
    setCurrentSection(e.target.value);
    navigate(e.target.value);
  };

  useEffect(() => {
    let startIndex = location.pathname.lastIndexOf('/');
    const currentSection = location.pathname.substring(startIndex + 1);
    setCurrentSection(currentSection);
  }, [location.pathname]);

  return (
    <div className='about'>
      <Row
        justify={'start'}
        style={{ position: 'relative', top: '-50px', height: 0 }}
      >
        <Col span={24}>
          <Radio.Group onChange={handleSectionChange} value={currentSection}>
            <Space style={{ textAlign: 'center' }}>
              <Radio.Button value='bahnaric' style={{ minWidth: '90px' }}>
                <span>Bahnaric</span>
              </Radio.Button>
              <Radio.Button value='model' style={{ minWidth: '90px' }}>
                <span>Model</span>
              </Radio.Button>
              <Radio.Button
                value='data-augmentation'
                style={{ minWidth: '90px' }}
              >
                <span>Data augmentation</span>
              </Radio.Button>
              <Radio.Button value='preprocessing' style={{ minWidth: '90px' }}>
                <span>Preprocessing</span>
              </Radio.Button>
              <Radio.Button value='references' style={{ minWidth: '90px' }}>
                <span>References</span>
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Col>
      </Row>
      <Routes>
        <Route path='/bahnar/nmt/bahnaric' element={<Bahnaric />} />
        <Route path='/bahnar/nmt/model' element={<Model />} />
        <Route path='/bahnar/nmt/data-augmentation' element={<DataAugmentation />} />
        <Route path='/bahnar/nmt/preprocessing' element={<Preprocessing />} />
        <Route path='/bahnar/nmt/references' element={<References />} />
        <Route path='/bahnar/nmt/*' element={<Navigate to='bahnaric' />} />
      </Routes>
    </div>
  );
};

export default About;
