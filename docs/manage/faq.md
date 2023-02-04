
PS F:\git\profabXweb> git add --all
PS F:\git\profabXweb> git commit -m"ss" 
[main 760612e] ss
 11 files changed, 51 insertions(+), 51 deletions(-)
 rename docs/cn/{explore => }/agv/_sidebar.md (100%)
 create mode 100644 docs/cn/agv/agv.md
 rename docs/cn/{explore => }/agv/algorithm.md (100%)
 rename docs/cn/{explore => }/agv/authentication.md (100%)
 rename docs/cn/{explore => }/agv/basic.md (100%)
 rename docs/cn/{explore => }/agv/debug.md (100%)
 rename docs/cn/{explore => }/agv/eee.md (100%)
 rename docs/cn/{explore => }/agv/me.md (100%)
 rename docs/cn/{explore => }/agv/parameters.md (100%)
PS F:\git\profabXweb> git push origin main    
fatal: unable to access 'https://github.com/profabx/profabXweb.git/': OpenSSL SSL_read: Connection was reset, errno 10054
PS F:\git\profabXweb> git config --global http.sslVerify "false"
PS F:\git\profabXweb> git pull origin main  