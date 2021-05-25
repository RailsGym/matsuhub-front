import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { newCanvas } from 'features/canvases/canvasSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { showCanvas } from 'features/canvases/canvasSlice';

export const getServerSideProps = async context => ({
  props: {
    layout: 'noSidebar'
  }
});

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

export default function CanvasNew() {
  const { createdCanvas } = useSelector((state: RootState) => state.canvas);
  const [title, setTitle] = useState<string | number>();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = event => {
    setTitle(event.target.value);
  };

  const saveCanvas = async() => {
    await dispatch(newCanvas(title));
    if (createdCanvas) {
      router.push(`/canvases/${createdCanvas.id}`);
      dispatch(showCanvas(createdCanvas.id));
    } 
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
