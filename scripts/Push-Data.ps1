foreach ($file in (Get-ChildItem -Path "*.json")) {    
    $id = "037069e7da3e4944be2cbc97c92409a5"
    wrangler kv:key put $file.BaseName.ToLower() --path=$($file.FullName) --namespace-id=$id
}

Find-EvergreenApp | ConvertTo-Json | Out-File -FilePath "./AllApps.json" -Encoding "Utf8" -NoNewline
wrangler kv:key put "_allapps" --path="./AllApps.json" --namespace-id=$id
Remove-Item -Path "./AllApps.json"
