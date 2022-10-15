#!/bin/bash

cp polushack.service  /etc/systemd/system/polushack.service
systemctl daemon-reload
systemctl restart polushack.service
systemctl enable polushack.service   #добавить в автозагрузку