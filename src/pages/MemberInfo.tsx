import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequestUserInfoResponse } from '../_lib/AuthServices';
import { useDeps } from '../_lib/DepContext';
import { isErrorWithMessage } from '../_lib/Error';

const MemberInfo = () => {
  const { authService, httpClient } = useDeps();
  const [memberInfo, setMemberInfo] = useState<RequestUserInfoResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function reqeustUserInfo() {
      try {
        const res = await authService.reqeustUserInfo();
        setMemberInfo(res);
      } catch (err: unknown) {
        navigate('/login', { replace: true });
      }
    }

    reqeustUserInfo();
  }, []);

  const handleClickLogout = async () => {
    try {
      await authService.requestLogout();
      httpClient.setHeader('Authorization', '');
      navigate('/login', { replace: true });
    } catch (err: unknown) {
      if (isErrorWithMessage(err)) {
        setErrorMessage(err.message);
        return;
      }
      console.log(err);
    }
  };

  return (
    <div
      data-testid="memberInfoWrapper"
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="col-span-6 sm:col-span-3">
            <div className="px-4 py-5 bg-white sm:p-6">
              {memberInfo && (
                <div data-testid="memberInfoCard">
                  <p data-testid="memberName">{memberInfo.name}</p>
                  <p>{memberInfo.email}</p>
                  <img src={memberInfo.profileImage} />
                </div>
              )}
              {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}
            </div>
          </div>
          <div className="py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              data-testid="logoutBtn"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
