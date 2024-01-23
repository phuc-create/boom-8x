import React from 'react'

const Instruction = () => {
  return (
    <div className="home">
      <div className="ins">
        <i>Cách chơi:</i>
        <br />
        <span>- Hãy đánh dấu 90 căn cứ để hoàn thành trò chơi.</span>
        <span>
          - Sẽ có 10 căn cứ bị gài mìn và hãy cố trãnh những bãi mìn đó.
        </span>{' '}
        <br />
        <br />
        <i>Tips:</i>
        <span>
          {' '}
          - Nếu đánh dấu vào căn cứ nhưng những ô xung quanh phát hiện có
          mìn,những ô nghi ngờ sẽ có màu vàng.
        </span>
        <br />
        <span>
          - Nếu lần đánh dấu tiếp theo gần những căn cứ đã đánh dấu nghi ngờ
          trước đó,và nếu là mìn thật, ô sẽ chuyển sang màu đỏ.
        </span>
        <br />
        Chúc mọi người chơi game vui vẻ nhé.
      </div>
    </div>
  )
}

export default Instruction
