const PasswordReset = () => {
  return (
    <div data-testid="passwordResetWapper">
      <form>
        <input type="email" placeholder="email" data-testid="emailInput" />
        <button type="submit" value="다음" data-testid="nextBtn" />
      </form>
    </div>
  );
};

export default PasswordReset;
