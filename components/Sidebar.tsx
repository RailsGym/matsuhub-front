import styled from 'styled-components';
import { BiDockLeft } from 'react-icons/bi';
import { FiLink2 } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SContainer = styled.div`
  width: 194px;
  height: 100%
  background-color: #f9f9f9;
  border-right: solid 2.5px #ebebeb;
`;

const SUl = styled.ul`
  height: 100vh;
`;

const SSideBarList = styled.li`
  margin: 0 20px;
  text-align: left;
  padding: 20px 0;
  color: #4d4d4d;
`;

const SSideBarFirstList = styled(SSideBarList)`
  padding-top: 25px;
  border-bottom: solid 2.5px #ebebeb;
`;

const IconStyle = {
  display: "inline-block",
  fontSize: "25px",
  color: "#D8D8D8",
  marginRight: "8px",
  marginBottom: "4px"
};

export default function Sidebar() {
  const router = useRouter();
  const { canvasId } = router.query;

  return (
    <SContainer>
      <SUl>
        <Link href={`/canvases/${canvasId}`}>
          <SSideBarFirstList className="hover: cursor-pointer hover:text-gray-900 hover:underline">
            <BiDockLeft style={IconStyle} />
            仮説キャンバス
          </SSideBarFirstList>
        </Link>
        <Link href={`/canvases/${canvasId}/settings`}>
          <SSideBarList className="hover: cursor-pointer hover:text-gray-900 hover:underline">
            <FiLink2 style={IconStyle} />
            設定
          </SSideBarList>
        </Link>
        {/* TODO: 最終的にはメンバー詳細ページのリンクを設定したい */}
        <Link href={`/canvases/${canvasId}`}>
          <SSideBarList className="hover: cursor-pointer hover:text-gray-900 hover:underline">
            <FiUsers style={IconStyle} />
            メンバー
          </SSideBarList>
        </Link>
      </SUl>
    </SContainer>
  );
}
