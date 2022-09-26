package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os/exec"
	"strings"
)

type App struct {
	ctx context.Context
}

type MonitorInfo struct {
	Displayname string `json:"displayname"`
	GeneralInfo string `json:"generalinfo"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// NewApp creates a new App application struct
func NewMonitorInfo(displayname string, generalInfo string) *MonitorInfo {
	return &MonitorInfo{
		displayname,
		generalInfo,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) ListXDevices() []string {
	out, err := exec.Command("xinput", "list", "--id-only").Output()

	if err != nil {
		log.Fatal(err)
	}

	ids := strings.Fields(string(out))
	return ids
}

func (a *App) ListDisplays() []byte {
	result, err := exec.Command("xrandr", "--listmonitors").Output()
	if err != nil {
		log.Fatal(err)
	}
	info := strings.FieldsFunc(string(result), func(c rune) bool { return c == '\n' || c == '\r' })

	monitorCount := strings.TrimSpace(strings.Split(info[0], ":")[1])
	log.Default().Printf("count: %v", monitorCount)

	monitorInfo := []*MonitorInfo{}
	for i := 1; i < len(info); i++ {
		info[i] = strings.TrimSpace(info[i])
		log.Default().Printf("%v", monitorInfo)
		splitInfo := strings.Split(info[i], "  ")
		monitorInfo = append(monitorInfo, NewMonitorInfo(strings.TrimSpace(splitInfo[1]), strings.TrimSpace(splitInfo[0])))
	}

	result, err = json.Marshal(monitorInfo)
	if err != nil {
		log.Fatal(err)
	}
	return result
}

func (a *App) GetXDeviceInfo(id string) string {
	out, err := exec.Command("xinput", "list", "--name-only", id).Output()
	if err != nil {
		log.Fatal(err)
	}

	name := string(out)
	log.Printf("%v", name)
	return fmt.Sprintf("id: %v, name: %v", id, name)
}
