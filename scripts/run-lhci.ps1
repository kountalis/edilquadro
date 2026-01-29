$env:PATH = "C:\\Windows\\System32;" + $env:PATH
Set-Location 'c:\Users\kount\Desktop\Stylianos\Sito internet\edilquadro3\project'
Write-Host 'Running LHCI with PATH focusing on System32 utilities'
npx lhci autorun
