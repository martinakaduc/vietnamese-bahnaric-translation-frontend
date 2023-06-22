import { Avatar } from 'antd';
import React from 'react';
import './Contact.scss';
import imageLong from '../assets/buingohoanglong.png';
import imagePhu from '../assets/nguyenhuuthienphu.png';
import imageTho from '../assets/quanthanhtho.png';
import imageTam from '../assets/bangngocbaotam.png';
import imageUser from '../assets/user.png';

const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact--card'>
        <div className='contact--card--image'>
          <Avatar gap={10} size={150} shape='square' src={imageLong} />
        </div>
        <div className='contact--card--body'>
          <div className='contact--card--body--title'>Bùi Ngô Hoàng Long</div>
          <div>Trường Đại học Bách Khoa TP.HCM</div>
          <div>Khoa Khoa học và Kỹ thuật Máy tính</div>
          <div>long.buibk2000@hcmut.edu.vn</div>
        </div>
      </div>
      <div className='contact--card'>
        <div className='contact--card--image'>
          <Avatar gap={10} size={150} shape='square' src={imagePhu} />
        </div>
        <div className='contact--card--body'>
          <div className='contact--card--body--title'>Nguyễn Hữu Thiên Phú</div>
          <div>Trường Đại học Bách Khoa TP.HCM</div>
          <div>Khoa Khoa học và Kỹ thuật Máy tính</div>
          <div>phu.nguyenpfoem@hcmut.edu.vn</div>
        </div>
      </div>
      <div className='contact--card'>
        <div className='contact--card--image'>
          <Avatar gap={10} size={150} shape='square' src={imageTam} />
        </div>
        <div className='contact--card--body'>
          <div className='contact--card--body--title'>
            Mr. Băng Ngọc Bảo Tâm
          </div>
          <div>Trường Đại học Bách Khoa TP.HCM</div>
          <div>Khoa Khoa học và Kỹ thuật Máy tính</div>
          <div>bnbaotam@hcmut.edu.vn</div>
        </div>
      </div>
      <div className='contact--card'>
        <div className='contact--card--image'>
          <Avatar gap={10} size={150} shape='square' src={imageTho} />
        </div>
        <div className='contact--card--body'>
          <div className='contact--card--body--title'>
            PGS.TS Quản Thành Thơ
          </div>
          <div>Trường Đại học Bách Khoa TP.HCM</div>
          <div>Khoa Khoa học và Kỹ thuật Máy tính</div>
          <div>qttho@hcmut.edu.vn</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
