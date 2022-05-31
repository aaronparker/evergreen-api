foreach ($file in (Get-ChildItem -Path "*.json")) {
    
    $id = "cbd95467b293457c87a8c6233307ae0f"
    wrangler kv:key put $file.BaseName --path=$($File.FullName) --namespace-id=$id
}

$id = "037069e7da3e4944be2cbc97c92409a5"
wrangler kv:key put "_AllApps" --path="./AllApps.json" --namespace-id=$id
