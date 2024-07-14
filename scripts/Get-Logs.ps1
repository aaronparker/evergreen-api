Get-Content -Path ./logs.json | ConvertFrom-Json | ForEach-Object {
    [PSCustomObject]@{
        Time         = (Get-Date -Date "01-01-1970") + ([System.TimeSpan]::FromSeconds($_.eventTimestamp / 1000))
        IP           = $_.event.request.headers.'x-real-ip'
        Country      = $_.event.request.headers.'cf-ipcountry'
        Region       = $_.event.request.cf.region
        Organization = $_.event.request.cf.asOrganization
        URL          = Split-Path -Path $_.event.request.url -Leaf
        UserAgent    = $_.event.request.headers.'user-agent'
    }
} | Export-Csv -Path ./logs.csv -Append
