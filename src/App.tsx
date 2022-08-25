import { useEffect, useState } from 'react'
import * as C from './App.styles'

import logoImage from './assets/dbz_logo.png'
import iconRestart from './svgs/restart.svg'
import { Items } from './data/items'

import { ButtonRestart } from './components/ButtonRestart'
import { GridItem } from './components/GridItem'
import { InfoItem } from './components/InfoItem'

import { GridItemType } from './types/GridItemType'
import { formatTime } from './helpers/formatTime'



const App = () => {

  const [playing, setPlaying] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => {
    resetAndCreateGrid()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTime(time + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, time])

  // verificar se os cards abertos são iguais
  useEffect(() => {
    if(shownCount === 2 ) {
      let opened = gridItems.filter((item) => {
        return item.shown === true
      })

      if(opened.length === 2) {
        
        if(opened[0].item === opened[1].item) {
          // v1 - se eles são iguais, tornar permanentes
          let tmpGrid = [...gridItems]
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid)
          setShownCount(0)
        } else {
          setTimeout(() => {
            // v2 - se eles não são iguais, feche eles
            let tmpGrid = [...gridItems]
            for(let i in tmpGrid) {
              tmpGrid[i].shown = false
            }
            setGridItems(tmpGrid)
            setShownCount(0)
          }, 1000)
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItems])

  // verificar se o jogo acabou
  useEffect(() => {
    if(moveCount > 0 && gridItems.every((item) => item.permanentShown === true)) {
      setPlaying(false)
    }
  }, [moveCount, gridItems])

  const resetAndCreateGrid = () => {
    // 1 - resetar o jogo
    setTime(0)
    setPlaying(false)
    setMoveCount(0)
    setShownCount(0)

    // 2.1 criar o grid vazio
    let tmpGrid: GridItemType[] = []
    for(let i = 0; i < (Items.length * 2); i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false

      })
    }
    // 2.2 - preencher o grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < Items.length; i++) {
        let pos = -1
        while(pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (Items.length * 2))
        }
        tmpGrid[pos].item = i
      }
    }

    // 2.3 jogar no state
    setGridItems(tmpGrid)

    // 3 -  começar o jogo
    setPlaying(true)
  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems]
      
      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true
        setShownCount(shownCount + 1)
      }
      setGridItems(tmpGrid)
    }
  }

  return (
    <div>
      <C.Cointainer>
        
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} alt="" width={200} />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label='Tempo' value={formatTime(time)}/>
            <InfoItem label='Movimentos' value={moveCount.toString()}/>
          </C.InfoArea>

          <ButtonRestart label='Reiniciar' icon={iconRestart} onClick={resetAndCreateGrid}/>
        </C.Info>

        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem 
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>

      </C.Cointainer>
    </div>
  )
}

export default App
