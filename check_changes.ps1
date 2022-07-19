if ($null -eq $env:REF) {
    Write-Host 'Переменная среды REF не найдена.'
    exit
}

if ($null -eq $env:TARGET_REPOSITORY) {
    Write-Host 'Переменная среды TARGET_REPOSITORY не найдена.'
    exit
}

if ((Test-Path last_commit.txt) -eq $false) {
    $lastHash = $null
}
else {
    $lastHash = Get-Content last_commit.txt
}

Push-Location -Path $env:TARGET_REPOSITORY

$hash = git rev-parse $env:REF

Pop-Location

if ($hash -eq $lastHash) {
    Write-Host "Изменений нет"
    exit 1
}

$hash | Out-File -FilePath last_commit.txt
