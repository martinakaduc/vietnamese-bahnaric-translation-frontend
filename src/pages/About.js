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
              <Radio.Button value='/bahnar/nmt/bahnaric' style={{ minWidth: '90px' }}>
                <span>Ngôn ngữ Bana</span>
              </Radio.Button>
              <Radio.Button value='/bahnar/nmt/model' style={{ minWidth: '90px' }}>
                <span>Mô hình</span>
              </Radio.Button>
              <Radio.Button
                value='/bahnar/nmt/data-augmentation'
                style={{ minWidth: '90px' }}
              >
                <span>Làm giàu dữ liệu</span>
              </Radio.Button>
              <Radio.Button value='/bahnar/nmt/preprocessing' style={{ minWidth: '90px' }}>
                <span>Tiền xử lý dữ liệu</span>
              </Radio.Button>
              <Radio.Button value='/bahnar/nmt/references' style={{ minWidth: '90px' }}>
                <span>Tài liệu thamn khảo</span>
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
