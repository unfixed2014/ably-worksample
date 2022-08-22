const ModifyPassword = () => {
  return (
    <div data-testid="modifyPassword">
      <form>
        <input type="password" placeholder="비밀번호" data-testid="passwordInput" />
        <input type="password" placeholder="비밀번호 확인" data-testid="passwordConfirmInput" />
        <input type="submit" value="변경하기" data-testid="submitBtn" />
      </form>
    </div>
  );
};

export default ModifyPassword;
