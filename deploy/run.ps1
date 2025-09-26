# Sai se algum comando falhar
$ErrorActionPreference = "Stop"

Write-Host " Gerando build..."
npm run build

# Caminho da pasta de build
$distPath = Join-Path $PWD "dist"
if (-not (Test-Path $distPath)) {
    Write-Host "Pasta dist/ não encontrada. Verifique se o build funcionou."
    Exit 1
}

# Cria branch gh-pages órfão se não existir
git show-ref --verify --quiet refs/heads/gh-pages
if ($LASTEXITCODE -ne 0) {
    Write-Host "Branch gh-pages não existe. Criando branch órfão..."
    git checkout --orphan gh-pages
    git reset --hard
    git commit --allow-empty -m "gh-pages inicial"
    git push origin gh-pages
    git checkout develop
}

# Remove worktree antiga se existir
if (Test-Path ".gh-pages") { 
    Write-Host "Removendo worktree antiga..."
    git worktree remove ".gh-pages" -f
    Remove-Item -Recurse -Force ".gh-pages"
}

# Cria worktree para gh-pages
Write-Host "Criando worktree .gh-pages..."
git worktree add .gh-pages gh-pages

# Limpa arquivos antigos na worktree, sem tocar no .git
Write-Host "Limpando arquivos antigos da worktree..."
Get-ChildItem -Path ".gh-pages" -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

# Copia build para a worktree
Write-Host "Copiando arquivos do build para .gh-pages..."
Copy-Item -Recurse "$distPath\*" ".gh-pages"

# Comita e envia
Set-Location ".gh-pages"
git add .
git commit -m "Deploy build" 
git push origin gh-pages --force
Set-Location ".."

# Remove worktree local (opcional)
Write-Host "🧹 Removendo worktree local..."
git worktree remove ".gh-pages"
git branch -D ".gh-pages"

Write-Host "Deploy concluído!"
