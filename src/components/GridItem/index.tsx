import { GridItemType } from '../../types/GridItemType'
import * as C from './styles'
import dbzLogo from '../../svgs/dbz_logo.png'
import { Items } from '../../data/items' 

type Props = {
  item: GridItemType
  onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
  return (
    <C.Container onClick={onClick} showBackground={item.permanentShown || item.shown}>
      {item.permanentShown === false && item.shown === false &&
        <C.Icon src={dbzLogo} alt="" opacity={0.6}/>
      }
      {(item.permanentShown || item.shown) && item.item !== null &&
        <C.Icon src={Items[item.item].icon} alt="" />
      }
    </C.Container>
  )
}