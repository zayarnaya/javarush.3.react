import { useContext } from "react"
import { ThemeContext } from "src/contexts/ThemeContext"

export const SearchResultsPage = () => {
    const {setTheme} = useContext(ThemeContext);
    setTheme('light');
    return (
        <div>SEARCH</div>
    )
}

SearchResultsPage.displayName = 'Search.Results.Page'