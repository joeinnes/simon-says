var $ = require('jquery')
var sequence = []
var index = 0
var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
var acceptClicks = true
var strictMode = false

$('#a').click(function () {
  userClick(0)
})
$('#b').click(function () {
  userClick(1)
})
$('#c').click(function () {
  userClick(2)
})
$('#d').click(function () {
  userClick(3)
})

$('#start').click(function () {
  reset()
})

$('#reset').click(function () {
  reset()
})

$('#strict').click(function () {
  strictMode = !strictMode
  if (strictMode) {
    $('#strict').html('Strict mode: on')
  } else {
    $('#strict').html('Strict mode: off')
  }
})

function userClick (val) {
  if (acceptClicks) {
    switch (val) {
      case 0:
        sound1.play()
        break
      case 1:
        sound2.play()
        break
      case 2:
        sound3.play()
        break
      case 3:
        sound4.play()
        break
    }
    if (val === sequence[index]) {
      right()
    } else {
      wrong()
    }
  } else {
    updateInstructions({
      className: 'warning',
      header: 'Slow it down a bit!',
      body: "You've got to wait for the entire sequence to play out before you start clicking... we wouldn't want you cheating now, would we?!"
    })
  }
}

function addToSequence () {
  if (sequence.length > 19) {
    updateInstructions({
      className: 'success',
      header: 'Nice work!!!',
      body: `You have won! Let's see if you can do it again! ${strictMode ? '' : "Seeing as you're so clever, why don't you try out strict mode?"}`
    })
    setTimeout(reset, 5000)
    return
  }
  var nextStep = Math.floor(Math.random() * 4)
  sequence.push(nextStep)
  console.log(sequence)
  nextStep = null
  index = 0
  $('#current-length').html(sequence.length)
  playSequence()
}

function reset () {
  sequence = []
  index = 0
  addToSequence()
}

function wrong () {
  if (strictMode) {
    updateInstructions({
      className: 'danger',
      header: 'Nope...',
      body: "That wasn't right... back to the start!"
    })
    setTimeout(reset, 2000)
  } else {
    updateInstructions({className: 'danger', header: 'Nope...', body: "That wasn't right... watch again."})
    setTimeout(playSequence, 2000)
    index = 0
  }
}

function right () {
  if (index === sequence.length - 1) {
    addToSequence()
    index = 0
  } else {
    index++
  }
}

function playSequence () {
  var timesToLoop = 0
  acceptClicks = false
  updateInstructions({
    className: 'primary',
    header: 'Are you sitting comfortably?',
    body: `Watch and listen! You've got ${sequence.length} ${sequence.length > 1 ? 'steps' : 'step'} to remember!`
  })
  function loop () {
    setTimeout(function () {
      switch (sequence[timesToLoop]) {
        case 0:
          $('#a').addClass('flash')
          setTimeout(function () {
            $('#a').removeClass('flash')
          }, 1500)
          sound1.play()
          break
        case 1:
          $('#b').addClass('flash')
          setTimeout(function () {
            $('#b').removeClass('flash')
          }, 1500)
          sound2.play()
          break
        case 2:
          $('#c').addClass('flash')
          setTimeout(function () {
            $('#c').removeClass('flash')
          }, 1500)
          sound3.play()
          break
        case 3:
          $('#d').addClass('flash')
          setTimeout(function () {
            $('#d').removeClass('flash')
          }, 1500)
          sound4.play()
          break
      }
      if (timesToLoop++ < sequence.length) {
        loop()
      } else {
        setTimeout(function () {
          acceptClicks = true
          updateInstructions({
            className: 'success',
            header: "Let's go!",
            body: 'Over to you...'
          })
        }, 500)
      }
    }, 1600)
  }
  loop()
}

function updateInstructions (instr) {
  $('#instruction-class').removeClass()
  $('#instruction-class').addClass('message is-' + instr.className)
  $('#instruction-header').html(instr.header)
  $('#instruction-body').html(instr.body)
}
