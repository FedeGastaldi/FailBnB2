#!/bin/sh

host="$1"
shift
cmd="$@"

echo "Esperando a que MySQL arranque en $host:3306..."

until mysqladmin ping -h"$host" --silent; do
  echo "MySQL no disponible todavía..."
  sleep 1
done

echo "MySQL está listo, ejecutando: $cmd"
exec $cmd
