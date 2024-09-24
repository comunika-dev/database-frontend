import {ThemeConfig, theme as antTheme} from 'antd'
import colors from './colors'

const theme:ThemeConfig = {
  token:{
    colorPrimary:colors.primary,
    borderRadius:0,
    colorLink:colors.primary,
    colorLinkActive:colors.primary,
    colorLinkHover:colors.primary,
    fontFamily: "Red Hat Display Regular",
    fontSize:16,
  }
}

export default theme