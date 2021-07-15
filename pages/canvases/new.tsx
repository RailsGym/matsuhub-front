import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { newCanvas } from 'features/canvases/canvasSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { createdCanvasReset } from 'features/canvases/canvasSlice';

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
  &:hover {
    color: #ccc;
    background-color: #0f8c98;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

export default function CanvasNew() {
  const { createdCanvas } = useSelector((state: RootState) => state.canvas);
  const [title, setTitle] = useState<string | number>();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (createdCanvas) {
      // TODO: 最終的には最後に操作したキャンバスに遷移されるように
      router.push(`/canvases/${createdCanvas.id}`);
      dispatch(createdCanvasReset());
    }
  }, [createdCanvas]);

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
        name="name"
        type="text"
        value={title}
        onChange={handleInputChange}
      />
      <SCreateButton
        name="createCanvas"
        onClick={saveCanvas}
      >
        新規作成
      </SCreateButton>
    </SContainer>
  );
}
