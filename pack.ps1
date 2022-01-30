if ($null -eq $env:TARGET_REPOSITORY) {
    Write-Host 'Переменная среды TARGET_REPOSITORY не найдена.'
    exit
}

Write-Host "Путь до репозитория: $($env:TARGET_REPOSITORY)"

$targetPath = Get-Location
$originalBin = "$(Get-Location)/bin/icons-atlas-packer"

if ($IsWindows) {
    $originalBin += ".exe"
}

Write-Host "Путь до icons-atlas-packer: $originalBin"

$binPath = Copy-Item -Path $originalBin -Destination $env:TARGET_REPOSITORY -PassThru

Push-Location -Path $env:TARGET_REPOSITORY

if ($IsLinux) {
    chmod +x './icons-atlas-packer'
}

Invoke-Expression $binPath

Move-Item 'database.bin' -Destination $targetPath -Force
Move-Item 'icons.bin' -Destination $targetPath -Force
Remove-Item $binPath

Pop-Location
