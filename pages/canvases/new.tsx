import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { newCanvas } from 'features/canvases/canvasSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import BasicAuth from 'components/BasicAuth';

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  if (process.env.NODE_ENV === 'production') {
    await BasicAuth(req, res);
    if (!req.headers.authorization) {
      res.end('<html>Unauthorized</html>');
    }
  }
  return {
    props: {
      layout: 'noSidebar'
    }
  };
}

const SContainer = styled.div`
  margin: auto;
  text-align: center;
  margin-top: 80px;
  width: 500px;
  height: 321px;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
`;
const STitle = styled.h1`
  font-size: 24px;
  margin: 30px 0;
`;
const SNameLabel = styled.p`
  text-align: left;
  margin-left: 40px;
  font-size: 12px;
  color: #b7b6b6;
`;
const SCanvasTitleInput = styled.input`
  width: 418px;
  height: 48px;
  margin-bottom: 45px;
  background-color: #f7f9f9;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
`;
const SCreateButton = styled.button`
  width: 418px;
  height: 48px;
  background-color: #13b1c0;
  border-radius: 5px;
  color: #ffffff;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;


const selectCanvas = (state: RootState) => state.canvas;

export default function CanvasNew() {
  const canvas = useSelector(selectCanvas);

  const [title, setTitle] = useState<string | number>();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (canvas) {
      router.push(`/canvases/${canvas.id}`);
    } 
  }, [canvas]);

  const handleInputChange = event => {
    setTitle(event.target.value);
  };
  const saveCanvas = () => {
    dispatch(newCanvas(title));
  };

  return (
    <SContainer>
      <STitle>キャンバス新規作成</STitle>
      <SNameLabel>名前</SNameLabel>
      <SCanvasTitleInput
        type="text"
        value={title}
        onChange={handleInputChange}
      />
      <SCreateButton disabled={!title} onClick={saveCanvas}>
        新規作成
      </SCreateButton>
    </SContainer>
  );
}
