    const symbols = ['🍎','🍌','🍇','🍓','🍎','🍌','🍇','🍓'];
    const shuffled = symbols.sort(() => 0.5 - Math.random());
    const board = document.getElementById('gameBoard');
    let firstCard = null;
    let lockBoard = false;

    shuffled.forEach(symbol => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.textContent = '';

      card.addEventListener('click', () => {
        if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.textContent = symbol;
        card.classList.add('flipped');

        if (!firstCard) {
          firstCard = card;
        } else {
          lockBoard = true;
          if (firstCard.dataset.symbol === card.dataset.symbol) {
            firstCard.classList.add('matched');
            card.classList.add('matched');
            resetBoard();
          } else {
            setTimeout(() => {
              firstCard.textContent = '';
              card.textContent = '';
              firstCard.classList.remove('flipped');
              card.classList.remove('flipped');
              resetBoard();
            }, 1000);
          }
        }
      });

      board.appendChild(card);
    });

    function resetBoard() {
      [firstCard, lockBoard] = [null, false];
    }